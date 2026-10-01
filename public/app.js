// Initialize client application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 App initialized successfully');
    fetchPostsFeed();
});

/**
 * Fetches JSON posts from API and renders them dynamically
 */
async function fetchPostsFeed() {
    const feedWrapper = document.getElementById('feed-wrapper');
    const postCountBadge = document.getElementById('post-count');
    const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();

        // Update post count badge
        if (postCountBadge) {
            postCountBadge.textContent = `${posts.length} Posts Loaded`;
        }

        // Clear loading spinner
        feedWrapper.innerHTML = '';

        // Construct HTML fragment efficiently
        const postsHTML = posts.map((post, index) => {
            return `
                <article class="post-card">
                    <div class="post-header">
                        <span class="post-number">#${index + 1}</span>
                        <h3>${escapeHTML(post.title)}</h3>
                    </div>
                    <p>${escapeHTML(post.body)}</p>
                </article>
            `;
        }).join('');

        feedWrapper.innerHTML = postsHTML;

    } catch (error) {
        console.error('Failed to load posts feed:', error);
        
        if (postCountBadge) {
            postCountBadge.textContent = 'Error Loading Data';
        }

        feedWrapper.innerHTML = `
            <div class="loading-state">
                <p style="color: #ef4444; font-weight: 600;">⚠️ Failed to load posts feed.</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem;">Please check your connection and try again.</p>
            </div>
        `;
    }
}

/**
 * Escapes HTML characters to prevent XSS vulnerabilities
 */
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
