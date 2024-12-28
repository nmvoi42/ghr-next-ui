

let redirects = [];

// Redirect to the first valid path, if it exists.
const firstValidPath = process.env.VALID_USER_TAGS?.split(',')?.[0];
if ( firstValidPath ) {
  redirects.push(
    {
      source: '/',
      destination: '/' + firstValidPath,
      permanent: true,
    }
  );
}

const nextConfig = {
  async redirects() {
    return redirects;
  },
};

export default nextConfig;