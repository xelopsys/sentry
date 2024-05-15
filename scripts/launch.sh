#!/bin/bash
set -eo pipefail

sudo docker ps
echo "Login in to docker"
aws ecr get-login-password --region $AWS_DEFAULT_REGION | sudo docker login --username AWS --password-stdin $AWS_ECR_REGISTRY_URL/$AWS_ECR_REPOSITORY
echo "Fetching latest image"
sudo docker pull $AWS_ECR_REGISTRY_URL/$AWS_ECR_REPOSITORY:latest
set +e
echo "Stopping current container"
sudo docker stop $AWS_ECR_REPOSITORY
echo "Removing old container"
sudo docker rm -f $AWS_ECR_REPOSITORY
set -e
echo "Starting new container"
sudo docker run \
  -e NEXT_PUBLIC_API_BASE_URL="$NEXT_PUBLIC_API_BASE_URL" \
  -e NEXT_PUBLIC_TENANT_ID="$NEXT_PUBLIC_TENANT_ID" \
  -e TENANT_API_TOKEN="$TENANT_API_TOKEN" \
  -e NEXT_PUBLIC_TENANT_LOCALE="$NEXT_PUBLIC_TENANT_LOCALE" \
  -e NEXT_PUBLIC_TENANT_AID="$NEXT_PUBLIC_TENANT_AID" \
  -e NEXT_PUBLIC_DEFAULT_CURRENCY="$NEXT_PUBLIC_DEFAULT_CURRENCY" \
  -e NEXT_PUBLIC_GA_ID="$NEXT_PUBLIC_GA_ID" \
  -e NEXT_PUBLIC_HOTJAR_ID="$NEXT_PUBLIC_HOTJAR_ID" \
  -e NEXT_PUBLIC_SITE_URL="$NEXT_PUBLIC_SITE_URL" \
  -e NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" \
  -e NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID="$NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID" \
  -e NEXT_PUBLIC_LOCATIONS_PATH="$NEXT_PUBLIC_LOCATIONS_PATH" \
  -d \
  --name "$AWS_ECR_REPOSITORY" \
  -p "$APP_PORT":3000/tcp \
  --restart always \
  "$AWS_ECR_REGISTRY_URL"/"$AWS_ECR_REPOSITORY":latest

echo "Clear docker trash"
sudo docker container prune -f
sudo docker image prune -f
sudo docker network prune -f
sudo docker volume prune -f
