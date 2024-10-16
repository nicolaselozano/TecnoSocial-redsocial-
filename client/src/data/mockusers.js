export const mock_user = {
  id: 1,
  name: "Juan Pérez",
  username: "jperez",
  email: "jperez@example.com",
  auth0Id: "auth0|123456",
  roles: ["backend", "frontend"],
  avatar: "https://picsum.photos/id/1009/400/400", // Imagen válida
  location: "Buenos Aires",
  job: "Desarrollador",
  redes: [
    { id: 1, github: "jperezdev" },
    { id: 2, linkedin: "juan-perez-123" }
  ],
  projects: [
    {
      id: 1,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "Angular es compatible con TypeScript isolatedModules.",
      image: "https://via.placeholder.com/500x200",
      likes: 10,
      comments: [
        {
          id: 1,
          user: "Laura Fernandez",
          comment: "Muy útil, gracias por compartir."
        },
        {
          id: 2,
          user: "Miguel Garcia",
          comment: "Justo lo que necesitaba saber."
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "El diseño minimalista mejora la experiencia de usuario.",
      likes: 15,
      comments: [
        {
          id: 3,
          user: "Sofia Perez",
          comment: "Totalmente de acuerdo!"
        },
        {
          id: 4,
          user: "Carlos Ruiz",
          comment: "Aplicaré esto en mi próximo proyecto."
        }
      ]
    },
    {
      id: 3,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "Probar una aplicación es clave para una buena experiencia.",
      image: "https://via.placeholder.com/500x200",
      likes: 8,
      comments: [
        {
          id: 5,
          user: "Daniela Martinez",
          comment: "Muy buen consejo."
        }
      ]
    },
    {
      id: 4,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "React y Angular son herramientas poderosas para el frontend.",
      likes: 20,
      comments: [
        {
          id: 6,
          user: "Miguel Garcia",
          comment: "Difícil decidir entre ambas."
        }
      ]
    },
    {
      id: 5,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "La automatización de despliegue ahorra tiempo y reduce errores.",
      image: "https://via.placeholder.com/500x200",
      likes: 7,
      comments: [
        {
          id: 7,
          user: "Andres Lopez",
          comment: "Automatizar es clave para la eficiencia."
        }
      ]
    },
    {
      id: 6,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "La escalabilidad en el backend es esencial para grandes proyectos.",
      likes: 12,
      comments: [
        {
          id: 8,
          user: "Manuel Rodriguez",
          comment: "Totalmente de acuerdo!"
        }
      ]
    },
    {
      id: 7,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "Un buen diseño de UX facilita la navegación de una aplicación.",
      image: "https://via.placeholder.com/500x200",
      likes: 9,
      comments: [
        {
          id: 9,
          user: "Sofia Perez",
          comment: "Diseño es todo!"
        }
      ]
    },
    {
      id: 8,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "Testear una interfaz garantiza que funcione en todas las resoluciones.",
      likes: 11,
      comments: [
        {
          id: 10,
          user: "Luis Gomez",
          comment: "Exacto, las pruebas son clave."
        }
      ]
    },
    {
      id: 9,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "Los microservicios son fundamentales para la escalabilidad.",
      image: "https://via.placeholder.com/500x200",
      likes: 14,
      comments: [
        {
          id: 11,
          user: "Carlos Ruiz",
          comment: "Microservicios son el futuro."
        }
      ]
    },
    {
      id: 10,
      user: {
        name: "Juan Pérez",
        avatar: "https://picsum.photos/id/1009/400/400", // Imagen del usuario
        roles: ["backend", "frontend"]
      },
      content: "CSS Grid y Flexbox simplifican el diseño de interfaces web.",
      likes: 13,
      comments: [
        {
          id: 12,
          user: "Sofia Perez",
          comment: "Genial, aplicaré esto!"
        }
      ]
    }
  ],
  createdAt: "2023-10-01",
  page:1,
  totalPosts: 10,
  totalPages: 1,
};

export const mock_users = [
  {
    id: 1,
    name: "Juan Pérez",
    username: "jperez",
    email: "jperez@example.com",
    auth0Id: "auth0|123456",
    roles: ["backend", "frontend"],
    avatar: "https://picsum.photos/id/1011/400/400", // Imagen válida
    location: "Buenos Aires",
    job: "Desarrollador",
    redes: [
      { id: 1, github: "jperezdev" },
      { id: 2, linkedin: "juan-perez-123" }
    ],
    projects: [
      { id: 1, name: "Proyecto A", description: "Descripción del proyecto A" },
      { id: 2, name: "Proyecto B", description: "Descripción del proyecto B" }
    ],
    createdAt: "2023-10-01"
  },
  {
    id: 2,
    name: "Ana García",
    username: "agarcia",
    email: "agarcia@example.com",
    auth0Id: "auth0|654321",
    roles: ["ui", "frontend"],
    avatar: "https://picsum.photos/id/1012/400/400", // Imagen válida
    location: "Madrid",
    job: "Diseñadora gráfica",
    redes: [
      { id: 1, github: "anagarciadev" },
      { id: 2, linkedin: "ana-garcia-456" }
    ],
    projects: [
      { id: 1, name: "Proyecto C", description: "Descripción del proyecto C" },
      { id: 2, name: "Proyecto D", description: "Descripción del proyecto D" }
    ],
    createdAt: "2023-08-15"
  },
  {
    id: 3,
    name: "Carlos López",
    username: "clopez",
    email: "clopez@example.com",
    auth0Id: "auth0|789012",
    roles: ["backend", "tester"],
    avatar: "https://picsum.photos/id/1013/400/400", // Imagen válida
    location: "Santiago",
    job: "Ingeniero de software",
    redes: [
      { id: 1, github: "clopezdev" },
      { id: 2, linkedin: "carlos-lopez-789" }
    ],
    projects: [
      { id: 1, name: "Proyecto E", description: "Descripción del proyecto E" }
    ],
    createdAt: "2023-07-20"
  },
  {
    id: 4,
    name: "Lucía Fernández",
    username: "lfernandez",
    email: "lfernandez@example.com",
    auth0Id: "auth0|321654",
    roles: ["ui", "ux"],
    avatar: "https://picsum.photos/id/1014/400/400", // Imagen válida
    location: "Barcelona",
    job: "Product Manager",
    redes: [
      { id: 1, github: "luciafm" },
      { id: 2, linkedin: "lucia-fernandez-321" }
    ],
    projects: [
      { id: 1, name: "Proyecto F", description: "Descripción del proyecto F" }
    ],
    createdAt: "2023-06-10"
  },
  {
    id: 5,
    name: "Mario Ruiz",
    username: "mruiz",
    email: "mruiz@example.com",
    auth0Id: "auth0|159753",
    roles: ["devops", "tester"],
    avatar: "https://picsum.photos/id/1015/400/400", // Imagen válida
    location: "Ciudad de México",
    job: "QA Engineer",
    redes: [
      { id: 1, github: "marioruizqa" },
      { id: 2, linkedin: "mario-ruiz-852" }
    ],
    projects: [
      { id: 1, name: "Proyecto G", description: "Descripción del proyecto G" }
    ],
    createdAt: "2023-09-05"
  },
  {
    id: 6,
    name: "Sofía Hernández",
    username: "shernandez",
    email: "shernandez@example.com",
    auth0Id: "auth0|753159",
    roles: ["frontend", "ux"],
    avatar: "https://picsum.photos/id/1016/400/400", // Imagen válida
    location: "Lima",
    job: "Data Analyst",
    redes: [
      { id: 1, github: "sofiaherndev" },
      { id: 2, linkedin: "sofia-hernandez-963" }
    ],
    projects: [
      { id: 1, name: "Proyecto H", description: "Descripción del proyecto H" }
    ],
    createdAt: "2023-04-17"
  },
  {
    id: 7,
    name: "Gabriel Torres",
    username: "gtorres",
    email: "gtorres@example.com",
    auth0Id: "auth0|852147",
    roles: ["backend", "devops"],
    avatar: "https://picsum.photos/id/1017/400/400", // Imagen válida
    location: "Bogotá",
    job: "Backend Developer",
    redes: [
      { id: 1, github: "gabrieltorresdev" },
      { id: 2, linkedin: "gabriel-torres-147" }
    ],
    projects: [
      { id: 1, name: "Proyecto I", description: "Descripción del proyecto I" }
    ],
    createdAt: "2023-05-30"
  },
  {
    id: 8,
    name: "Elena Sánchez",
    username: "esanchez",
    email: "esanchez@example.com",
    auth0Id: "auth0|951357",
    roles: ["ui", "ux", "frontend"],
    avatar: "https://picsum.photos/id/1018/400/400", // Imagen válida
    location: "Montevideo",
    job: "UX/UI Designer",
    redes: [
      { id: 1, github: "elenasdesigns" },
      { id: 2, linkedin: "elena-sanchez-357" }
    ],
    projects: [
      { id: 1, name: "Proyecto J", description: "Descripción del proyecto J" }
    ],
    createdAt: "2023-02-25"
  }
  ,
];

