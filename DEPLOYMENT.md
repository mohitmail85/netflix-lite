# Deployment Guide: Netflix Lite Microfrontend Architecture

This document outlines how Netflix Lite is deployed to AWS using S3 + CloudFront with a microfrontend architecture.

## Architecture Overview

```
GitHub → GitHub Actions → AWS S3 → CloudFront CDN → Users
  ├─ Host App (/, /details/:id)
  └─ Search MFE (/search)
```

**Components**:
- **S3 Bucket**: Stores both host and search static files
- **CloudFront**: Global CDN serving both applications
- **GitHub Actions**: Two separate workflows (host + search)
- **Module Federation**: Runtime loading of search microfrontend

**Live URL**: Your CloudFront distribution domain (e.g., `https://d123456abcdef.cloudfront.net`)

## Prerequisites

### AWS Resources

You need:
1. S3 bucket for static hosting
2. CloudFront distribution pointing to S3
3. IAM user with S3 and CloudFront permissions

### GitHub Secrets

Configure these secrets in your GitHub repository:

| Secret | Description | Example |
|--------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS region | `us-east-1` |
| `AWS_S3_BUCKET` | S3 bucket name | `netflix-lite-prod` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront ID | `E1234EXAMPLE` |
| `CLOUDFRONT_DOMAIN` | CloudFront domain | `d123abc456def.cloudfront.net` |

## Initial AWS Setup

### 1. Create S3 Bucket

1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Click **Create bucket**
3. Configure:
   - **Bucket name**: `netflix-lite-app` (must be globally unique)
   - **Region**: `us-east-1` (or closest region)
   - **Block Public Access**: Keep ALL enabled
   - **Versioning**: Disabled
4. Click **Create bucket**
5. Select bucket → **Properties** → **Static website hosting**
   - Enable
   - **Index document**: `index.html`
   - **Error document**: `index.html`
   - Save

### 2. Configure CORS for Module Federation

S3 bucket needs CORS enabled for Module Federation to work:

1. Go to bucket → **Permissions** → **CORS configuration**
2. Add:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 3. Create CloudFront Distribution

1. Go to [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click **Create distribution**
3. Configure:
   - **Origin domain**: Select your S3 bucket
   - **Origin access**: Origin Access Control (OAC)
     - Create new OAC → Use defaults
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Cache policy**: CachingOptimized
   - **Default root object**: `index.html`
4. Click **Create distribution**
5. Copy the S3 bucket policy and apply it to your bucket
6. Note the **Distribution domain name** and **Distribution ID**

### 4. Configure CloudFront Error Pages

Required for React Router SPA routing:

1. Go to distribution → **Error pages** tab
2. Add two custom error responses:

**404 Error:**
- HTTP error code: 404
- Response page path: `/index.html`
- HTTP response code: 200

**403 Error:**
- HTTP error code: 403
- Response page path: `/index.html`
- HTTP response code: 200

### 5. Create IAM User

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Create user: `github-actions-netflix-lite`
3. Create and attach policy (see `aws/iam-policy.json`)
4. Create access key → Download credentials

### 6. Configure GitHub Secrets

Add all 6 secrets listed in the Prerequisites table above.

## Deployment Workflows

### Two Separate Workflows

**deploy-host.yml** - Deploys main app
- Triggers on: `packages/host/**` or `packages/shared-*/**` changes
- Builds: Host app with search remote URL
- Deploys to: S3 root (`/`)
- Invalidates: `/`, `/index.html`, `/assets/*`

**deploy-search.yml** - Deploys search MFE
- Triggers on: `packages/search/**` or `packages/shared-*/**` changes
- Builds: Search MFE with `/search/` base
- Deploys to: S3 `/search/` path
- Invalidates: `/search/*`

### Automatic Deployment

Push to `main` automatically triggers the relevant workflow(s) based on changed files.

### Manual Deployment

1. Go to GitHub Actions tab
2. Select workflow (Deploy Host or Deploy Search)
3. Click "Run workflow"

## Deployment Structure

```
S3 Bucket:
├── index.html              # Host entry (cache: no-cache)
├── assets/
│   ├── index-*.js         # Host app (cache: 1 year)
│   └── index-*.css        # Host styles (cache: 1 year)
└── search/
    ├── index.html         # Search standalone (cache: no-cache)
    └── assets/
        ├── remoteEntry.js # Module Federation entry (cache: 1 year)
        ├── index-*.js     # Search app (cache: 1 year)
        └── index-*.css    # Search styles (cache: 1 year)
```

## Environment Variables

### Production Builds

Host app:
```bash
VITE_SEARCH_REMOTE_URL=https://<cloudfront-domain>/search/assets/remoteEntry.js
```

Search app:
```bash
VITE_BASE_URL=/search/
```

These are set automatically in GitHub Actions workflows.

### Local Development

Defaults work for local development:
- Host: http://localhost:5173
- Search: http://localhost:5174

## Deployment Order

When deploying both apps:

1. **Deploy Search MFE first** - Ensures remote is available
2. **Deploy Host App second** - Immediately loads new search module

If you change both, push search changes first, wait for deployment, then push host changes.

## Verification Checklist

After deployment:

1. **Home Page**: `https://[domain]/` loads correctly
2. **Details Page**: Navigate and refresh `/details/1` works
3. **Search Page**: Navigate to `/search` loads the MFE
4. **Search Functionality**: Filters and results work
5. **No CORS Errors**: Check browser console
6. **remoteEntry.js**: Loads in Network tab when accessing search

## Troubleshooting

### Search module fails to load

- Verify `CLOUDFRONT_DOMAIN` secret is correct
- Check remoteEntry.js exists: `https://[domain]/search/assets/remoteEntry.js`
- Verify S3 CORS configuration
- Check CloudFront cache was invalidated

### Changes not visible

- Clear browser cache: Ctrl+F5
- Check GitHub Actions logs for errors
- Manually invalidate CloudFront:
  ```bash
  aws cloudfront create-invalidation \
    --distribution-id <ID> \
    --paths "/*"
  ```

### 404 on page refresh

- Verify CloudFront error pages configured (Step 4)
- Check 404 and 403 both redirect to `/index.html`

### CORS errors

- Verify S3 CORS configuration (Step 2)
- Ensure GET and HEAD methods allowed
- Check AllowedOrigins includes `*` or your domain

## Manual Deployment (Emergency)

If GitHub Actions fails:

### Deploy Search MFE

```bash
pnpm install
pnpm build:shared
VITE_BASE_URL=/search/ pnpm build:search

aws s3 sync packages/search/dist/ s3://your-bucket/search/ --delete

aws cloudfront create-invalidation \
  --distribution-id <ID> \
  --paths "/search/*"
```

### Deploy Host App

```bash
pnpm install
pnpm build:shared
VITE_SEARCH_REMOTE_URL=https://[domain]/search/assets/remoteEntry.js pnpm build:host

aws s3 sync packages/host/dist/ s3://your-bucket/ \
  --delete \
  --exclude "search/*"

aws cloudfront create-invalidation \
  --distribution-id <ID> \
  --paths "/" "/index.html" "/assets/*"
```

## Monitoring

### CloudFront Metrics

- Go to CloudFront → Distribution → Monitoring
- View requests, data transfer, error rates

### GitHub Actions Logs

- Repository → Actions → View workflow runs
- Check build logs for errors

### S3 Bucket

- Check deployed files and timestamps
- Verify both root and `/search/` paths exist

## Cost Estimate

**With AWS Free Tier** (first 12 months): $0-2/month
- S3: 5GB storage, 20K GET requests FREE
- CloudFront: 1TB transfer, 10M requests FREE

**After Free Tier**: ~$3-5/month for low-traffic usage

## Security

- ✅ S3 bucket private (CloudFront OAC access only)
- ✅ HTTPS enforced (HTTP redirects)
- ✅ Minimal IAM permissions
- ✅ Credentials in GitHub Secrets (never committed)
- ✅ Source maps disabled in production
- ✅ CORS restricted to necessary methods

## Rollback

To rollback a bad deployment:

1. Go to GitHub Actions
2. Find last successful workflow
3. Re-run that workflow

Or checkout previous commit and deploy manually.

## Future Enhancements

- Custom domain with Route 53
- Preview deployments for PRs
- CloudWatch alarms for errors
- Additional microfrontends (Profile, Watchlist)
- CDN optimizations (Brotli, image optimization)

## Resources

- [Module Federation Documentation](https://module-federation.github.io/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

Need help? Check GitHub Actions logs or open an issue in the repository.
