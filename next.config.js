/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    AUTH_SECRET_CODE: "bestSecretKey69",
    GOOGLE_CLIENT_ID:
      "1087913822594-natogc6epn51l3c99g6m4d4lbuhnt1ml.apps.googleusercontent.com",
    MICROSOFT_CLIENT_ID: "338823d9-df6d-4f3e-99d8-59684ea97904",
    MICROSOFT_REDIRECT_URL: "http://localhost:3000",
    MICROSOFT_AUTHORITY: "https://login.microsoftonline.com/common",
    PGSQL_HOST: "db.nhqxdqzofpvanlurnhuu.supabase.co",
    PGSQL_PORT: 5432,
    PGSQL_DATABASE: "postgres",
    PGSQL_USER: "postgres",
    PGSQL_PASSWORD: "xse71l3v8Touxwop",
    CLOUDINARY_CLOUD_NAME: "df6xfkpgb",
    CLOUDINARY_API_KEY: "419656483832311",
    CLOUDINARY_API_SECRET: "RhrBLeJb35blPfAW44RktvNokkA",
  },
}

module.exports = nextConfig
