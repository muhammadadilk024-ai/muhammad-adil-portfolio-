<?php
// Contact form endpoint for muhammadadil.cloud.
// The contact page posts JSON here and the message is emailed to the site owner from this server.
// Nothing is stored, except a scrambled record of the sender's IP address that is kept for ten minutes
// so one visitor cannot flood the inbox.
declare(strict_types=1);

const CONTACT_TO = 'adil@muhammadadil.cloud';
const CONTACT_FROM = 'adil@muhammadadil.cloud'; // a real mailbox on this domain, so the host accepts and delivers it
const CONTACT_HOSTS = ['muhammadadil.cloud', 'www.muhammadadil.cloud'];
const CONTACT_TOPICS = ['A project', 'A remote role', 'Fixing or improving an existing site', 'Something else'];

function contact_reply(array $body, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex');
    echo json_encode($body);
    exit;
}

function contact_cut(string $text, int $max): string
{
    return function_exists('mb_substr') ? mb_substr($text, 0, $max, 'UTF-8') : substr($text, 0, $max);
}

// One line of text: control characters (including line breaks) become spaces, so nothing can be smuggled into a header.
function contact_line($value, int $max): string
{
    $text = is_scalar($value) ? (string) $value : '';
    $text = (string) preg_replace('/[\x00-\x1F\x7F]+/', ' ', $text);
    return contact_cut(trim($text), $max);
}

// Several lines of text: line breaks and tabs stay, other control characters go.
function contact_text($value, int $max): string
{
    $text = is_scalar($value) ? (string) $value : '';
    $text = str_replace(["\r\n", "\r"], "\n", $text);
    $text = (string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/', '', $text);
    return contact_cut(trim($text), $max);
}

// The browser says which site the request came from. Only this site may post here.
function contact_same_site(): bool
{
    $source = (string) ($_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? ''));
    if ($source === '') {
        return false;
    }
    $host = parse_url($source, PHP_URL_HOST);
    return is_string($host) && in_array(strtolower($host), CONTACT_HOSTS, true);
}

// Allows at most $limit calls per $window seconds for one key. The record lives in the server's temp folder.
function contact_allowed(string $key, int $window, int $limit): bool
{
    $file = rtrim(sys_get_temp_dir(), '/\\') . '/ma-contact-' . sha1($key . '|' . __FILE__) . '.json';
    $now = time();
    $stamps = [];
    $raw = @file_get_contents($file);
    if (is_string($raw)) {
        $saved = json_decode($raw, true);
        if (is_array($saved)) {
            foreach ($saved as $stamp) {
                if (is_int($stamp) && $stamp > $now - $window) {
                    $stamps[] = $stamp;
                }
            }
        }
    }
    if (count($stamps) >= $limit) {
        return false;
    }
    $stamps[] = $now;
    @file_put_contents($file, json_encode($stamps), LOCK_EX);
    return true;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    contact_reply(['ok' => false, 'error' => 'method'], 405);
}
if (!contact_same_site()) {
    contact_reply(['ok' => false, 'error' => 'blocked'], 403);
}

$raw = (string) file_get_contents('php://input');
if (strlen($raw) > 20000) {
    contact_reply(['ok' => false, 'error' => 'too_long'], 413);
}
$in = json_decode($raw, true);
if (!is_array($in)) {
    contact_reply(['ok' => false, 'error' => 'bad_request'], 400);
}

// A hidden field people never see. Anything typed into it came from a bot, which gets a polite yes and no email.
if (contact_line($in['_honey'] ?? '', 50) !== '') {
    contact_reply(['ok' => true]);
}

$name = contact_line($in['name'] ?? '', 120);
$email = contact_line($in['email'] ?? '', 200);
$topic = contact_line($in['topic'] ?? '', 80);
$message = contact_text($in['message'] ?? '', 6000);
if (!in_array($topic, CONTACT_TOPICS, true)) {
    $topic = 'Something else';
}

$fields = [];
if ($name === '') {
    $fields[] = 'name';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $fields[] = 'email';
}
if (strlen($message) < 20) {
    $fields[] = 'message';
}
if ($fields !== []) {
    contact_reply(['ok' => false, 'error' => 'invalid', 'fields' => $fields], 422);
}

$forwarded = (string) ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');
$visitor = trim(explode(',', $forwarded)[0]);
if ($visitor === '') {
    $visitor = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}
if (!contact_allowed('visitor|' . $visitor, 600, 5) || !contact_allowed('everyone', 3600, 40)) {
    contact_reply(['ok' => false, 'error' => 'rate'], 429);
}

$subject = 'New message from muhammadadil.cloud: ' . $topic;
$body = "Name: $name\nEmail: $email\nTopic: $topic\n\n$message\n\n"
    . "-- \nSent from the contact form on https://muhammadadil.cloud/contact/\n"
    . "Reply to this email to answer $name directly.\n";
$headers = implode("\r\n", [
    'From: Muhammad Adil website <' . CONTACT_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = @mail(CONTACT_TO, $subject, $body, $headers, '-f' . CONTACT_FROM);
if (!$sent) {
    $sent = @mail(CONTACT_TO, $subject, $body, $headers);
}
if (!$sent) {
    error_log('contact.php: mail() returned false');
    contact_reply(['ok' => false, 'error' => 'send_failed'], 502);
}

contact_reply(['ok' => true]);
