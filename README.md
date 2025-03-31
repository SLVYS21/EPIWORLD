# EPIWORLD Plateforme Scolaire

## Description
Ce projet est une plateforme web scolaire permettant aux étudiants de :
- **Gérer les objets perdus/trouvés**
- **Participer à un forum étudiant**
- **Commander des repas à la cantine**
- **S'inscrire et se connecter avec validation d'un administrateur**

Le projet est développé avec la stack **MERN** :
- **Frontend** : React.js
- **Backend** : Node.js, Express
- **Base de données** : MongoDB

## Fonctionnalités Principales
### 1. Authentification et gestion des utilisateurs
- Inscription avec validation par un administrateur
- Connexion sécurisée avec JWT
- Gestion des rôles (admin, étudiant, cantine...)
- Mise à jour du profil utilisateur

### 2. Objets Perdus/Trouvés
- Publier un objet perdu/trouvé
- Rechercher et revendiquer un objet
- Ajouter des commentaires

### 3. Forum Étudiant
- Publier des threads/questions
- Ajouter des commentaires
- Système de like/dislike
- Filtrer les posts par hashtags

### 4. Cantine
- Consulter le menu du jour
- Passer et suivre des commandes
- Interface admin pour gérer les commandes et les stocks

## Installation et Lancement
### 1. Prérequis
- **Node.js** (>= 14.x recommandé)
- **MongoDB** (local ou via un service cloud comme MongoDB Atlas)

### 2. Cloner le projet
```sh
git clone https://github.com/ton-repo/world.git
cd mvp-scolaire
```

### 3. Installation des dépendances
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

### 4. Configuration des variables d'environnement
Créer un fichier **.env** dans le dossier `backend` et ajouter les valeurs suivantes :
```env
PORT=8080
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=supersecretkey
```

### 5. Lancer le projet
#### Démarrer le backend
```sh
cd backend
npm install
nodemon index
```
#### Démarrer le frontend
```sh
cd frontend
npm start
```

Le projet sera accessible à l'adresse `http://localhost:3000/`.

## Structure du Projet
```bash
world/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│
└── README.md
```

## API Backend
La documentation Swagger est disponible à l'adresse :
```
http://localhost:8080/api/docs
```

## Contributions
Les contributions sont les bienvenues ! N'hésite pas à proposer des améliorations via des **pull requests**.

## Licence
Ce projet est sous licence MIT. Tu peux l'utiliser librement et l'améliorer à ta convenance.

