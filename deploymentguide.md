# Deployment Guide

## Server Information

| Item | Value |
|------|------|
| Server IP |192.168.10.7 |
| SSH Port | 22 |
| Project Path | miadmin@gensv01:/home$ |

---

```

---

# Full Deployment

```bash
ssh -p 22 miadmin@192.168.10.7

cd ..
->miadmin@gensv01:/home$

cd /HeroAdditainalSystem/api-fleetviews

git pull

npm run pm2-start

```


# Available Services

cd /HeroAdditainalSystem/fleetviews
cd /HeroAdditainalSystem/api-fleetviews

cd /ITPv3AdditainalSystem/Fuel_API/api-fuelconversion
cd /ITPv3AdditainalSystem/Fuelconversion/fuelconversion