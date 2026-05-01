const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseConfig() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  return {
    url: supabaseUrl as string,
    anonKey: supabaseAnonKey as string,
  };
}

export function getSiteUrl() {
  return siteUrl;
}

export function normalizeCourseAssetPath(pathOrUrl: string) {
  if (!pathOrUrl || pathOrUrl.startsWith("http") || pathOrUrl.startsWith("/")) {
    return pathOrUrl;
  }

  const config = getSupabaseConfig();

  if (!config) {
    return pathOrUrl;
  }

  const normalizedPath = pathOrUrl.replace(/^course-meta\//, "");
  return `${config.url}/storage/v1/object/public/course-meta/${normalizedPath}`;
}

export function denormalizeCourseAssetPath(pathOrUrl: string) {
  if (!pathOrUrl || pathOrUrl.startsWith("/")) {
    return pathOrUrl;
  }

  const config = getSupabaseConfig();

  if (!config) {
    return pathOrUrl.replace(/^course-meta\//, "");
  }

  const publicPrefix = `${config.url}/storage/v1/object/public/course-meta/`;

  if (pathOrUrl.startsWith(publicPrefix)) {
    return pathOrUrl.slice(publicPrefix.length);
  }

  return pathOrUrl.replace(/^course-meta\//, "");
}
