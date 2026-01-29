# Deployment Guide: Netflix Lite on AWS

This document outlines how Netflix Lite is deployed to AWS using S3 + CloudFront for static site hosting.

## Architecture

```
GitHub → GitHub Actions → AWS S3 → CloudFront CDN → Users
```

**Components**:
- **S3 Bucket**: Stores static build files (HTML, CSS, JS, images)
- **CloudFront**: Global CDN with HTTPS and SPA routing support
- **GitHub Actions**: Automated CI/CD pipeline (lint → build → deploy)
- **IAM User**: Dedicated credentials for deployment automation

**Live URL**: Your CloudFront distribution domain (e.g., `https://d123456abcdef.cloudfront.net`)

## Cost

**With AWS Free Tier** (first 12 months): $0-2/month
- S3: 5GB storage, 20K GET requests FREE
- CloudFront: 1TB transfer, 10M requests FREE

**After Free Tier**: ~$3-5/month for typical low-traffic usage

## Initial AWS Setup

### 1. Create S3 Bucket

1. Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
2. Click **Create bucket**
3. Configure:
   - **Bucket name**: `netflix-lite-app` (must be globally unique - add suffix if taken)
   - **Region**: `us-east-1` (or closest region)
   - **Block Public Access**: Keep ALL enabled (CloudFront accesses privately)
   - **Versioning**: Disabled
4. Click **Create bucket**
5. Select bucket → **Properties** tab → **Static website hosting**
   - Click **Edit** → Enable
   - **Index document**: `index.html`
   - **Error document**: `index.html` (critical for React Router!)
   - Save changes

### 2. Create CloudFront Distribution

1. Go to [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click **Create distribution**
3. Configure:
   - **Origin domain**: Select your S3 bucket from dropdown
   - **Origin access**: Origin Access Control (OAC)
     - Click **Create new OAC** → Use defaults → **Create**
   - **Viewer protocol policy**: Redirect HTTP to HTTPS
   - **Cache policy**: CachingOptimized
   - **Default root object**: `index.html`
4. Click **Create distribution**
5. **IMPORTANT**: After creation, a banner appears with S3 bucket policy
   - Click **Copy policy**
   - Go to S3 bucket → **Permissions** → **Bucket policy** → Paste and save
6. Note the **Distribution domain name** (e.g., `d123456abcdef.cloudfront.net`)
7. Note the **Distribution ID** (e.g., `E1234ABCD5678`) - needed for GitHub Secrets

### 3. Configure CloudFront Error Pages (CRITICAL)

This step is **required** for React Router to work correctly with direct URLs.

1. Go to your CloudFront distribution → **Error pages** tab
2. Click **Create custom error response** and add:

**Error Response 1:**
- **HTTP error code**: 404 Not Found
- **Customize error response**: Yes
- **Response page path**: `/index.html`
- **HTTP response code**: 200 OK
- Click **Create**

**Error Response 2:**
- **HTTP error code**: 403 Forbidden
- **Customize error response**: Yes
- **Response page path**: `/index.html`
- **HTTP response code**: 200 OK
- Click **Create**

**Why this matters**: When users visit `/details/1` directly or refresh a page, CloudFront looks for that file in S3 (doesn't exist → 404). These rules redirect to `/index.html`, which loads React, and React Router handles the route.

### 4. Create IAM User for GitHub Actions

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Users** → **Create user**
3. **User name**: `github-actions-netflix-lite`
4. **AWS access type**: No console access (programmatic only)
5. Click **Next**
6. **Permissions**: Attach policies directly → **Create policy**
   - Click **JSON** tab
   - Paste contents from `aws/iam-policy.json` (in this repo)
   - Update the S3 bucket name if you used a different name
   - Click **Next** → Name: `GitHubActionsNetflixLiteDeploy` → **Create policy**
7. Return to user creation → Select the policy you just created
8. Click **Next** → **Create user**
9. Select the user → **Security credentials** tab → **Create access key**
10. **Use case**: Application running outside AWS
11. **Download .csv file** with credentials (shown only once!)
    - Contains: Access key ID + Secret access key

### 5. Configure GitHub Secrets

1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `AWS_ACCESS_KEY_ID` | From IAM credentials CSV | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | From IAM credentials CSV | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Your S3 bucket region | `us-east-1` |
| `AWS_S3_BUCKET` | Your S3 bucket name | `netflix-lite-app` |
| `CLOUDFRONT_DISTRIBUTION_ID` | From CloudFront console | `E1234ABCD5678` |

### 6. Wait for CloudFront Deployment

CloudFront takes **10-15 minutes** to deploy globally. Status changes from "Deploying" → "Enabled".

You can proceed with GitHub setup while waiting.

## Deployment Workflow

### Automatic Deployment

Every push to the `main` branch triggers automatic deployment:

1. **Lint**: Runs ESLint to catch errors
2. **Build**: Compiles TypeScript and bundles assets with Vite
3. **Deploy to S3**: Syncs build files to S3 bucket
4. **Invalidate CloudFront**: Clears CDN cache to serve fresh content

View progress in **GitHub Actions** tab.

### Manual Deployment (Optional)

You can also trigger deployment manually:

1. Go to repository → **Actions** tab
2. Select **Deploy to AWS** workflow
3. Click **Run workflow** → Select `main` branch → **Run**

## Deployment Verification

After deployment completes (3-5 minutes):

### Test Checklist

1. **Home Page**
   - Visit `https://[your-cloudfront-domain].cloudfront.net/`
   - Verify movies load and display correctly
   - Check that hero section appears

2. **Navigation**
   - Click on a movie card → Should navigate to Details page
   - Click "Back to Home" → Should return to home page

3. **React Router SPA Routing** (Most Important!)
   - Visit a details page (e.g., `/details/1`)
   - **Refresh the page** (F5 or Ctrl+R)
   - Should reload the same details page, NOT show 404 error
   - Try direct URL in new tab: `https://[domain].cloudfront.net/details/2`
   - Should load details page directly

4. **HTTPS**
   - Verify URL shows `https://` (padlock icon)
   - Try `http://` URL → Should redirect to `https://`

5. **Error Handling**
   - Visit invalid movie ID: `/details/999`
   - Should show app's own error handling, not CloudFront error

### Common Issues

**Problem**: Page shows 404 or CloudFront error on refresh

**Solution**: Check CloudFront error pages configuration (Step 3)
- Distributions → Your distribution → Error pages tab
- Verify both 404 and 403 are configured to return `/index.html` with 200 status

**Problem**: Old content shows after deployment

**Solution**:
1. Hard refresh browser: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
2. Check GitHub Actions logs - ensure CloudFront invalidation completed
3. Manually invalidate if needed (see below)

**Problem**: GitHub Actions fails with "Access Denied"

**Solution**:
1. Verify all 5 GitHub Secrets are set correctly
2. Check IAM policy attached to user
3. Verify S3 bucket name matches in secrets and policy
4. Check S3 bucket policy allows CloudFront OAC

**Problem**: CloudFront shows 403 for all requests

**Solution**:
1. Go to S3 bucket → Permissions → Bucket policy
2. Ensure CloudFront OAC policy is applied (from Step 2.5)
3. Verify CloudFront origin uses OAC, not public access

## Manual Operations

### Build and Test Locally

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
# Opens on http://localhost:4173

# Test SPA routing: navigate to /details/1 and refresh
```

### Manual CloudFront Invalidation

If automated cache invalidation fails or you need immediate refresh:

```bash
# Install AWS CLI first: https://aws.amazon.com/cli/
aws configure  # Enter your credentials

# Invalidate all cached files
aws cloudfront create-invalidation \
  --distribution-id E1234ABCD5678 \
  --paths "/*"

# Or invalidate specific paths
aws cloudfront create-invalidation \
  --distribution-id E1234ABCD5678 \
  --paths "/index.html" "/assets/*"
```

**Note**: First 1,000 invalidations/month are FREE.

### Manual S3 Deployment

For testing or emergency deployments:

```bash
# Build first
npm run build

# Deploy to S3
aws s3 sync dist/ s3://netflix-lite-app --delete

# Set proper cache headers
aws s3 cp s3://netflix-lite-app/index.html \
  s3://netflix-lite-app/index.html \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type text/html

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id E1234ABCD5678 \
  --paths "/*"
```

## Monitoring & Logs

### GitHub Actions Logs

1. Repository → **Actions** tab
2. Click on latest workflow run
3. Click on **Build and Deploy** job
4. Expand steps to view logs

### AWS CloudFront Monitoring

1. CloudFront Console → Your distribution → **Monitoring** tab
2. View requests, data transfer, and error rates
3. **Note**: Detailed metrics may take 15+ minutes to appear

### S3 Bucket Contents

1. S3 Console → Your bucket
2. View uploaded files from latest deployment
3. Check file sizes and timestamps

## Security Best Practices

- ✅ **Never commit AWS credentials** - always use GitHub Secrets
- ✅ **S3 bucket is private** - CloudFront accesses via OAC, not public URLs
- ✅ **Minimal IAM permissions** - User can only access specific S3 bucket + CloudFront
- ✅ **HTTPS enforced** - HTTP automatically redirects
- ✅ **Source maps disabled** - Production build doesn't expose source code
- ⚠️ **Rotate credentials** - If IAM credentials leak, delete user and create new one

## Updating Deployment

### Update AWS Configuration

If you change bucket name, region, or distribution:

1. Update GitHub Secrets (Settings → Secrets and variables → Actions)
2. Update `aws/iam-policy.json` if bucket name changed
3. Re-apply IAM policy to user

### Rollback Deployment

If a deployment breaks the site:

1. Go to GitHub → **Actions** tab
2. Find last working deployment
3. Click **...** → **Re-run all jobs**

Or manually deploy a previous commit:

```bash
git checkout <previous-commit-hash>
npm run build
aws s3 sync dist/ s3://netflix-lite-app --delete
aws cloudfront create-invalidation --distribution-id E1234ABCD5678 --paths "/*"
git checkout main
```

## Next Steps (Future Enhancements)

- **Custom Domain**: Register domain + Route 53 + CloudFront alternate domain
- **CI Improvements**: Add unit tests, E2E tests, bundle size checks
- **Monitoring**: Set up CloudWatch alarms for errors or high costs
- **Preview Deployments**: Deploy PR branches to separate S3 paths for testing
- **Performance**: Enable Brotli compression, optimize images

## Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)

---

**Need help?** Check the troubleshooting section or review GitHub Actions logs for error details.
