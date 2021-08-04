function resolveHost() {
  let github = "https://api.github.com";
  return github;
}

export default function get(url) {
  return async () => {
    try {
      const host = resolveHost();
      const response = await fetch(host + url, {
        method: 'GET',
      });
      const parsedResponse = await response.json();
      if (!response.ok) return Promise.reject(new Error(parsedResponse.message));
      return parsedResponse;
    } catch (e) {
      return Promise.reject(new Error('Erro ao conectar com o Github'));
    }
  };
}
