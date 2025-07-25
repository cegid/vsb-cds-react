# 📚 Documentation Stories

Ce dossier contient les stories de documentation pour Storybook qui remplacent le README.md dans l'interface.

## 🗂️ Organisation des Stories

### 1. **Introduction/Getting Started** (`Introduction.stories.tsx`)
Contient l'équivalent du README.md principal avec :
- Installation et configuration
- Présentation des 46+ composants UI
- Exemples d'usage de base
- Informations sur les améliorations récentes (DatePicker refactorisation)

### 2. **Introduction/Architecture** (`Architecture.stories.tsx`)
Documentation détaillée de l'architecture :
- Structure du projet avec arborescence
- Catégories de composants avec liens directs
- Patterns React modernes utilisés
- Design tokens (couleurs, typographie, espacement)

### 3. **Design Tokens/Colors** (`DesignTokens.stories.tsx`)
Visualisation interactive des palettes de couleurs :
- Toutes les palettes VSB (Primary, Secondary, Neutral, Semantic)
- Affichage visuel avec codes couleurs
- 11 niveaux pour chaque palette (10-99)

## 🎯 Navigation dans Storybook

L'ordre des stories est configuré dans `.storybook/preview.tsx` :

```typescript
storySort: {
  order: [
    'Introduction', 
    ['Getting Started', 'Architecture'],
    'Design Tokens',
    'Components',
    ['Buttons', 'Inputs', 'Navigation', 'Layout', 'Data Display', 'Feedback'],
    '*'
  ],
}
```

## 📖 Contenu du README Original

Tout le contenu du `README.md` principal est maintenant accessible via ces stories Storybook :

- ✅ **Installation** → Introduction/Getting Started
- ✅ **Architecture** → Introduction/Architecture  
- ✅ **Design System** → Design Tokens/Colors
- ✅ **Exemples d'usage** → Introduction/Getting Started
- ✅ **Liens utiles** → Intégrés dans toutes les pages

## 🚀 Développement

Pour ajouter une nouvelle page de documentation :

1. Créer un nouveau fichier `.stories.tsx` dans ce dossier
2. Utiliser le pattern avec `docs.page` pour le contenu
3. Ajouter le titre dans l'ordre de `preview.tsx` si nécessaire

Exemple :
```typescript
const meta = {
  title: "Documentation/Nouvelle Page",
  parameters: {
    docs: {
      page: () => (
        <Box p={4}>
          {/* Contenu JSX */}
        </Box>
      ),
    },
  },
} satisfies Meta;
```