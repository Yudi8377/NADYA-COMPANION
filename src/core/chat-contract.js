export const MAX_MESSAGES = 12;
export const MAX_MESSAGE_CHARS = 4000;
export const MAX_BODY_BYTES = 24000;
export function validateChatInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || !Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > MAX_MESSAGES) return null;
  const messages = []; let total = 0;
  for (const item of body.messages) {
    if (!item || !['user', 'assistant'].includes(item.role) || typeof item.content !== 'string') return null;
    const content = item.content.trim();
    if (!content || content.length > MAX_MESSAGE_CHARS) return null;
    total += content.length;
    if (total > 18000) return null;
    messages.push({ role: item.role, content });
  }
  if (messages[messages.length - 1].role !== 'user') return null;
  const memories = Array.isArray(body.memories) ? body.memories.slice(0, 20).filter((item) => typeof item === 'string').map((item) => item.trim().slice(0, 500)).filter(Boolean) : [];
  return { messages, memories };
}
export function allowRequest(requestWindows, key, now = Date.now(), limit = 12, windowMs = 60000) {
  const current = requestWindows.get(key);
  if (!current || now - current.start >= windowMs) { requestWindows.set(key, { start: now, count: 1 }); return true; }
  if (current.count >= limit) return false;
  current.count += 1; return true;
}
