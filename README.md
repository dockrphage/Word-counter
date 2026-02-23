

# 🚀 Word Counter App — Kubernetes Deployment with MetalLB & Jenkins CI/CD

This project demonstrates a full end‑to‑end CI/CD pipeline deploying a containerized Word Counter application to a **multi‑node Kubernetes cluster running inside Vagrant**, using:

- **Jenkins** for CI/CD  
- **Docker Hub** for image hosting  
- **MetalLB** for LoadBalancer support  
- **Kubernetes Deployments & Services** for workload orchestration  

The setup behaves like a mini‑cloud environment, closely mirroring AWS EKS + ELB.

---

# 📘 Architecture Overview

| Component | Purpose |
|----------|---------|
| **Vagrant Kubernetes Cluster** | Local multi‑node cluster for testing |
| **containerd** | Container runtime used by Kubernetes |
| **Jenkins** | Builds, tags, and pushes Docker images |
| **Docker Hub** | Stores application images |
| **MetalLB** | Provides LoadBalancer IPs inside Vagrant |
| **Kubernetes Deployment** | Manages application pods |
| **Kubernetes Service (LoadBalancer)** | Exposes the app externally |

Explore:  
- Kubernetes Deployment  
- LoadBalancer service  
- MetalLB  

---

# 🏗️ MetalLB Configuration

MetalLB enables LoadBalancer services in bare‑metal or Vagrant environments.

### `IPAddressPool`
```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: default-pool
  namespace: metallb-system
spec:
  addresses:
    - 192.168.56.240-192.168.56.250
```

### `L2Advertisement`
```yaml
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: l2
  namespace: metallb-system
```

Explore:  
- IPAddressPool  
- L2Advertisement  

---

# 📦 Kubernetes Deployment & Service

### **Deployment**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: word-counter-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: word-counter
  template:
    metadata:
      labels:
        app: word-counter
    spec:
      containers:
      - name: word-counter-container
        image: dockrphage/word-counter:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 80
```

### **Service**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: word-counter-service
spec:
  selector:
    app: word-counter
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

Explore:  
- containerPort  
- Kubernetes Services  

---

# 🔄 Jenkins CI/CD Pipeline

The Jenkinsfile performs:

1. Build Docker image  
2. Tag image  
3. Push to Docker Hub  
4. Apply Kubernetes manifests  
5. Wait for MetalLB to assign an external IP  
6. Output the service URL  

**Important:**  
A typo in the Jenkinsfile referencing the wrong manifest caused the cluster to deploy an outdated image name, leading to `ImagePullBackOff`. Fixing the Jenkinsfile resolved the issue.

Explore:  
- jsonpath  

---

# 🧪 Testing the Deployment

### Test inside the cluster
```bash
kubectl run test --rm -it --image=busybox -- wget -O- http://word-counter-service
```

### Test via MetalLB external IP
```bash
curl http://<EXTERNAL-IP>
```

Example:
```bash
curl http://192.168.56.242
```

---

# 🐛 Troubleshooting Summary

### **Symptom:** LoadBalancer IP assigned but app unreachable  
**Cause:** Pods were not running.

---

### **Symptom:** Pods stuck in `ImagePullBackOff`  
**Cause:** Deployment referenced wrong image:

```
villedevops/word-counter:latest
```

But Jenkins was pushing:

```
dockrphage/word-counter:latest
```

---

### **Symptom:** BusyBox test hung  
**Cause:** Service had **zero endpoints** because pods never started.

---

### **Root Cause:**  
A **typo in the Jenkinsfile** pointed to the wrong Kubernetes manifest.  
Fixing the reference allowed the correct image to deploy, and everything began working end‑to‑end.

---

# 🎉 Final Verification

```bash
curl http://192.168.56.242
```

Returned:

```html
<title>Aahil's WordCounter</title>
```

This confirms:

- MetalLB routing works  
- Service endpoints are healthy  
- Pods are running  
- Container is serving traffic  
- CI/CD pipeline is correct  

---

# 🚀 Next Steps (Optional Enhancements)

You can extend this setup with:

- readinessProbe  
- livenessProbe  
- rolling updates  
- NGINX Ingress  
- blue/green deployments  

---
