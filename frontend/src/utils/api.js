const API_BASE = 'https://tavrdesing.com.ua/api';

export async function getArticleList() {
  try {
    const response = await fetch(`${API_BASE}/blog/articles/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Не вдалося завантажити статті. Спробуйте пізніше.');
  }
}

export async function getProjectsList() {
  try {
    const response = await fetch(`${API_BASE}/core/projects/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Не вдалося завантажити проекти. Спробуйте пізніше.');
  }
}

export async function getProjectById(id) {
  try {
    const response = await fetch(`${API_BASE}/core/projects/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Не вдалося завантажити проект. Спробуйте пізніше.');
  }
}

export async function getBlogPosttById(id) {
  try {
    const response = await fetch(`${API_BASE}/blog/articles/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Не вдалося завантажити статтю. Спробуйте пізніше.');
  }
}

export async function getQuestions() {
  try {
    const response = await fetch(`${API_BASE}/consultations/questions/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Не вдалося завантажити питання. Спробуйте пізніше.');
  }
}

export async function getProjectConfigurations() {
  try {
    const response = await fetch(`${API_BASE}/core/project-configurations/`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(
      'Не вдалося завантажити данні проектів. Спробуйте пізніше.'
    );
  }
}
