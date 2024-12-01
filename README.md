how to install ts with vite
1. install vite and tailwind
2. Copy all codes from tsconfig.app.json and paste in tsconfig.json
3. Paste this code in tsconfig.json after 'skipLibCheck'
```javascript
"baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
```