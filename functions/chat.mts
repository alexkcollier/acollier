export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  const body = await req.json();

  if (!body?.messages?.length) {
    return new Response(null, { status: 400 });
  }

  // TODO: wire up LLM
  return new Response(JSON.stringify({ message: 'Not yet implemented.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
