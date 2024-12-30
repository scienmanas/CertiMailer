## 🔩 Environment Variables

This project requirement .env configuration in `Backend` as well in `Frontend` folder.

### Backend

| Varibale             | Description                    |
| :------------------- | :----------------------------- |
| `ADMIN_APP_PASSWORD` | App password of admin email    |
| `ADMIN_EMAIL`        | Admin email                    |
| `DOMAIN`             | domain name                    |
| `ENV`                | Env: test, dev, prod           |
| `G_BUCKET_NAME`      | Google cloud bucket name       |
| `G_PROJECT_ID`       | Google cloud project id        |
| `JWT_SECRET`         | JWT Secret                     |
| `MONGO_DEV_URI`      | Database URI                   |
| `MONGO_PROD_URI`     | Database URI                   |
| `MONGO_TEST_URI`     | Database URI                   |
| `PORT`               | Port number for backend (5000) |

### Frontend

| Varibale                  | Description          |
| :------------------------ | :------------------- |
| `G_ANALYTICS_ID`          | Google Analytics tag |
| `DOMAIN`                  | Domain name          |
| `SITE_NAME`               | Site name            |
| `NEXT_PUBLIC_BACKEND_URI` | Backend URI          |

## 🔨 Setting Up

Follow the following instruction to setup the project and run locally

- All the setup is automatically done, to run locally on `dev` env, use command for both `Backend` and `Frontend` folder

```bash
npm i && npm run dev
```

## 📦 Deployment

- Please check package.json of `Backend` and `Frontend` folder for deployment scripts.
