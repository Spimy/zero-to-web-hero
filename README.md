# Zero to Web Hero Episode 8
- OCI: https://www.oracle.com/cloud/free/
- Image / Shape: Ubuntu 24.04 / VM.Standard.E2.1.Micro
- Free subdomain: https://freedns.afraid.org/

# Domain setup
- Brief explanation of A Record (IPv4), AAAA Record (IPv6), CNAME Record (alias), MX Record (Mail) and TXT Record (notes and/or for security)
- Read more: https://www.cloudflare.com/learning/dns/dns-records/

# For the sake of explanation only, will use ubuntu as main user, since setting up SSH will be lengthy
- Create new user as root (sudo su): `sudo adduser <username>`
- Sudo permission: `sudo usermod -aG sudo <username>`
- Test new user sudo permission: `su - <username>`
- Add SSH key for new user: https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/addingusers.htm (OCI only)
- Generally recommended to create a user with sudo permissions if the VPS / compute instance logs in as root for security reasons

# Setting basic things up (for Ubuntu Minimal)
- Update apt-get repo: `sudo apt-get update`
- Download nano: `sudo apt-get install nano`
- Download tmux: `sudo apt-get install tmux`
- Download dns tools: `sudo apt-get install dnsutils`
- Download git: `sudo apt-get install git-all`

# Need to configure Firewall (inbound/outbound) using OCI dashboard
- Explain through `Network security groups` (preferred for security)
- Can be configured through the subnet's security list as well
- TCP for port 80
- TCP and UDP for port 443 (brief explanation on why UDP for 443)
- Only for ingress

# Do everything inside tmux session
- Start tmux: `tmux`
- Reattach session: `tmux attach-session -t <session_id>`
- List tmux sessions: `tmux list-sessions`
- Cheatsheet for tmux: https://tmuxcheatsheet.com/

- Clone repository branch: git clone -b session-8 https://github.com/Spimy/zero-to-web-hero.git
- Client .env: `VITE_API_URL=http://<subdomain>/api`
- Server .env: `JWT_SECRET=secret`
- Generate JWT Secret: https://jwtsecret.com/generate

# Add Docker's official GPG key:
Follow Docker's documentation (https://docs.docker.com/engine/install/ubuntu/):
```
sudo apt-get update

sudo apt-get install ca-certificates curl

sudo install -m 0755 -d /etc/apt/keyrings

sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc
```

# Add the repository to Apt sources:
- Add to repository:
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- Update the repository: `sudo apt-get update`
- Install Docker: `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

- Add user to docker group: `sudo usermod -aG docker <username>`
- Refresh permissions: `newgrp docker`

- Test DNS propagation: `nslookup <subdomain>`

# Slow server, so build each image one at a time
- Build server: `sudo docker compose build server --no-cache`
- Build client: `sudo docker compose build client --no-cache`

- Run the project: `docker compose up`
- Kill all running containers: `docker stop $(docker ps -a -q)`

# After setting up certbot in docker compose
Test it: `docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d <subdomain>`
Generate cert: `docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d <subdomain>`
Renew certificate: `docker compose run --rm certbot renew`

# In NGINX config
```
server {
  listen 80;
  server_name <subdomain>;
  return 301 https://$host$request_uri;
}
```

For ssl:
```
ssl_certificate /etc/letsencrypt/live/<subdomain>/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/<subdomain>/privkey.pem;
```

- Restart NGINX: `docker compose restart client`