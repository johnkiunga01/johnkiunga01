import toast from 'react-hot-toast';

export function setupLinkedInListener(onSuccess?: () => void) {
  const allowedOrigin = window.location.origin;

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== allowedOrigin) return;

    if (event.data?.type === 'LINKEDIN_AUTH_SUCCESS') {
      toast.success('LinkedIn account linked successfully!');
      if (onSuccess) onSuccess();
    }

    if (event.data?.type === 'LINKEDIN_AUTH_ERROR') {
      toast.error(`LinkedIn connection failed: ${event.data.error || 'Unknown error'}`);
    }
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}

export async function isLinkedInConnected(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/linkedin/status', { credentials: 'same-origin' });
    if (!response.ok) return false;
    const data = await response.json();
    return data.connected === true;
  } catch {
    return false;
  }
}
