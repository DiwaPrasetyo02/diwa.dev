export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  status?: "ACTIVE" | "ARCHIVED";
};

export type Project = {
  id: string;
  title: string;
  link?: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  themeColor: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialLink: string;
};

export type PortfolioData = {
  personal: {
    name: string;
    role: string;
    email: string;
    phone: string;
    website: string;
    github: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    x: string;
    summary: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: { category: string; items: string[] }[];
  education: {
    university: string;
    degree: string;
    location: string;
    period: string;
    gpa?: string;
  };
  certifications: Certification[];
};

export const portfolioData: PortfolioData = {
  personal: {
    name: "Diwa Prasetyo",
    role: "AI Engineer",
    email: "diwapraset02@gmail.com",
    phone: "+62 812-7088-4178",
    website: "https://github.com/DiwaPrasetyo02",
    github: "https://github.com/DiwaPrasetyo02",
    linkedin: "https://linkedin.com/in/diwa-prasetyo/",
    facebook: "https://linkedin.com/in/diwa-prasetyo",
    instagram: "https://linkedin.com/in/diwa-prasetyo",
    x: "https://linkedin.com/in/diwa-prasetyo",
    summary:
      "Experienced practitioner in AI and software development with a strong track record of building and deploying production-ready ML/DL systems. Skilled in developing CNN-based classifiers (90.2% accuracy), RAG pipelines, AI agent orchestration, OCR document processing, and XGBoost models (97% F1). Proficient in Python, PyTorch, FastAPI, LangChain, and Docker — from data preprocessing and model training to API integration and production deployment.",
  },
  experience: [
    {
      id: "exp-intikom",
      company: "Intikom Berlian Mustika",
      role: "Backend, AI Engineer",
      location: "Hybrid",
      period: "Mar 2026 – Present",
      status: "ACTIVE",
      description:
        "Developed and enhanced backend services for an Intelligence Document Processing system using Python and Docker. Implemented document enrichment, retry mechanisms, credit refund logic, and AI guardrails to improve system reliability and output accuracy. Collaborated with cross-functional teams to integrate APIs, optimize database structures, and maintain technical documentation. Experienced in debugging, handling edge cases, and building scalable backend solutions following best practices.",
    },
    {
      id: "exp-gits",
      company: "GITS",
      role: "Web, Data, AI Engineer",
      location: "Hybrid",
      period: "Sep 2025 – Mar 2026",
      status: "ARCHIVED",
      description:
        "Implemented machine learning for hoarding analysis and discount optimization to maximize company returns. Built AI-powered web applications using OCR, RAG, vectorization, embeddings, and AI extraction. Converted unstructured data into structured data and implemented AI validation rules. Developed applications using Streamlit, Gemini, Mistral, Git, and Docker. Created an AI agent orchestration system using Gemini ADK, FastAPI, and Streamlit.",
    },
    {
      id: "exp-aisoftdev",
      company: "AISoftDev",
      role: "AI Engineer Intern",
      location: "Remote",
      period: "Sep 2025 – Oct 2025",
      status: "ARCHIVED",
      description:
        "Built and deployed browser extensions/web applications that capture prompts from AI platforms (ChatGPT, Claude, Gemini) and convert them into structured JSON. Developed AI tools that summarize web content, enrich context, validate claims, and generate professional PDF reports using LLMs.",
    },
    {
      id: "exp-laskar-ai",
      company: "Laskar AI",
      role: "AI Engineer Mentee",
      location: "Indonesia",
      period: "Feb 2025 – Jun 2025",
      status: "ARCHIVED",
      description:
        "Selected for scholarship among 13K+ participants. Built CekMabukAI, a CNN-based solution for detecting drunk individuals with 90.2% accuracy. Developed projects in machine learning, deep learning, and data science.",
    },
    {
      id: "exp-garuda-insight",
      company: "Garuda Insight",
      role: "Data and AI Engineer Intern",
      location: "Jakarta",
      period: "Sep 2024 – Dec 2024",
      status: "ARCHIVED",
      description:
        "Developed AI solutions for medical treatment analysis using Randomized Controlled Trials (RCT) and T-Learner methods. Implemented Natural Language Entity Extraction using NegBio. Evaluated model performance using Precision, Recall, and F1 Score. Applied Q&A systems powered by BERT. Conducted model interpretation using Grad-CAM and permutation feature importance analysis.",
    },
    {
      id: "exp-ruangguru",
      company: "Ruangguru Engineering Academy",
      role: "AI Engineer Mentee",
      location: "Indonesia",
      period: "Jul 2024 – Sep 2024",
      status: "ARCHIVED",
      description:
        "Developed expertise in Python, Pandas, NumPy, Matplotlib, Seaborn, PyTorch, SQL, and Elasticsearch. Processed FIFA 21 datasets for cleaning, preprocessing, and visualization. Built an XGBoost model for player classification with 97% Accuracy and 97% F1 Score. Created an image classification pipeline published on Hugging Face with a Gradio-based UI. Conducted advanced SQL and Elasticsearch queries for E-Commerce dataset analysis.",
    },
    {
      id: "exp-rakamin",
      company: "Rakamin Academy",
      role: "Data Science Virtual Intern",
      location: "Indonesia",
      period: "Jun 2024 – Jul 2024",
      status: "ARCHIVED",
      description:
        "Gained hands-on experience in Big Data, Statistics, SQL, Python, and Machine Learning. Completed industry-based case studies and project-based learning. Delivered actionable insights and machine learning models.",
    },
    {
      id: "exp-startup-campus",
      company: "StartUp Campus",
      role: "Data Science and AI Engineer Mentee",
      location: "Indonesia",
      period: "Feb 2024 – Jun 2024",
      status: "ARCHIVED",
      description:
        "Participated in the Kampus Merdeka program focused on Data Science and AI fundamentals. Built a final project on stock price prediction using SARIMA Time Series. Collaborated with mentors to develop data analysis, machine learning algorithms, and AI applications.",
    },
  ],
  projects: [
    {
      id: "cek-mabuk-ai",
      title: "CekMabukAI",
      shortDescription: "CNN-based solution for detecting drunk individuals with 90.2% accuracy.",
      fullDescription:
        "Built CekMabukAI, a deep learning solution for detecting intoxicated individuals using Convolutional Neural Networks. Achieved 90.2% accuracy through careful model architecture design, data augmentation, and hyperparameter tuning. The project was developed as part of the Laskar AI scholarship program.",
      techStack: ["Python", "PyTorch", "CNN", "OpenCV"],
      themeColor: "#FF90E8",
    },
    {
      id: "time-series-forecasting",
      title: "Time Series Forecasting for Stock Investment",
      shortDescription: "Stock price prediction using SARIMA Time Series model.",
      fullDescription:
        "Developed a stock price prediction system using SARIMA (Seasonal ARIMA) time series analysis. The project involved data collection, stationarity testing, model selection, and forecast evaluation. Built as the final project for the StartUp Campus Kampus Merdeka program.",
      techStack: ["Python", "Pandas", "NumPy", "SARIMA", "Matplotlib"],
      themeColor: "#23A094",
    },
    {
      id: "bbc-text-classification",
      title: "BBC Article Multiclass Text Classification",
      shortDescription: "Multiclass text classification of BBC news articles using NLP techniques.",
      fullDescription:
        "Built a multiclass text classification system for BBC news articles across multiple categories. Implemented text preprocessing, feature extraction using TF-IDF/word embeddings, and trained classifiers for accurate article categorization. Evaluated model performance using precision, recall, and F1 score metrics.",
      techStack: ["Python", "Scikit-learn", "NLP", "Pandas", "NumPy"],
      themeColor: "#FFC900",
    },
    {
      id: "heart-attack-detection",
      title: "Heart Attack & Diabetes Detection",
      shortDescription: "Medical risk prediction using K-Nearest Neighbors algorithm.",
      fullDescription:
        "Developed a KNN-based classification system for detecting heart attack and diabetes risks from medical datasets. Performed data preprocessing, feature selection, and hyperparameter optimization to maximize prediction accuracy. Visualized decision boundaries and feature importance for model interpretability.",
      techStack: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
      themeColor: "#FF6B6B",
    },
    {
      id: "employee-churn",
      title: "Employee Churn Prediction",
      shortDescription:
        "Predicting employee turnover using machine learning classification models.",
      fullDescription:
        "Built a predictive model to identify employees at risk of leaving the company. Analyzed HR dataset features including satisfaction level, tenure, and performance metrics. Compared multiple classification algorithms and deployed the best-performing model for actionable HR insights.",
      techStack: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
      themeColor: "#4F46E5",
    },
    {
      id: "student-performance",
      title: "Student Performance Analysis",
      shortDescription: "Analysis of factors affecting student academic performance.",
      fullDescription:
        "Conducted comprehensive analysis of student performance data to identify key factors influencing academic outcomes. Applied statistical analysis, data visualization, and machine learning techniques to uncover patterns and provide actionable recommendations for educational improvement.",
      techStack: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
      themeColor: "#22C55E",
    },
    {
      id: "recommendation-system",
      title: "Collaborative Learning Recommendation System",
      shortDescription: "A recommendation engine for collaborative learning group formation.",
      fullDescription:
        "Designed and implemented a collaborative recommendation system for optimizing learning group formation. Applied collaborative filtering techniques to match students based on skills, learning preferences, and performance metrics. Enhanced learning outcomes through intelligent group composition.",
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      themeColor: "#FF90E8",
    },
    {
      id: "credit-risk",
      title: "Credit Risk Analytics",
      shortDescription: "Credit risk assessment and analytics for loan approval prediction.",
      fullDescription:
        "Developed a credit risk analytics system for predicting loan default probabilities. Performed extensive feature engineering, class imbalance handling, and model evaluation on financial datasets. Delivered a robust classification model with comprehensive risk scoring and interpretability analysis.",
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Seaborn"],
      themeColor: "#FFC900",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "SQL", "Java", "PHP", "C++", "JavaScript"],
    },
    {
      category: "AI & ML Frameworks",
      items: [
        "PyTorch",
        "TensorFlow",
        "LangChain",
        "Hugging Face",
        "Scikit-learn",
        "YOLO",
        "XGBoost",
      ],
    },
    {
      category: "Data Processing",
      items: ["Pandas", "NumPy", "Seaborn", "Matplotlib", "Looker Studio"],
    },
    {
      category: "Web & Backend",
      items: ["React", "FastAPI", "Streamlit", "Docker"],
    },
    {
      category: "Databases & Search",
      items: ["SQL", "Elasticsearch", "PgVector"],
    },
    {
      category: "Cloud & Tools",
      items: ["GCP", "Git", "GitHub", "Gradio"],
    },
    {
      category: "AI Concepts",
      items: [
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Retrieval Augmented Generation",
        "Data Visualization",
        "Data Preparation",
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Problem Solving",
        "Critical Thinking",
        "Project Management",
        "Communication",
        "Teamwork",
        "Leadership",
        "Self Development",
        "Time Management",
      ],
    },
  ],
  education: {
    university: "Universitas Pendidikan Indonesia",
    degree: "Bachelor Degree in Software Engineering",
    location: "Bandung, Indonesia",
    period: "Sep 2021 – Aug 2025",
    gpa: "3.81 / 4.00",
  },
  certifications: [
    {
      id: "cert-mtcna",
      title: "MTCNA",
      issuer: "MikroTik",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-startup-campus",
      title: "Data Science and AI",
      issuer: "StartUp Campus",
      date: "2024",
      credentialLink: "",
    },
    {
      id: "cert-fundamental-ai",
      title: "Fundamental of AI",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-fundamental-sql",
      title: "Fundamental of SQL",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-fundamental-data-science",
      title: "Fundamental of Data Science",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-applied-data-science",
      title: "Applied Data Science",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-git-github",
      title: "Git & GitHub",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-data-visualization",
      title: "Data Visualization",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-ml-beginner",
      title: "Machine Learning for Beginner",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-ml-development",
      title: "Machine Learning Development",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
    {
      id: "cert-applied-ml",
      title: "Applied Machine Learning",
      issuer: "Dicoding",
      date: "",
      credentialLink: "",
    },
  ],
};

export const terminalStack: string[] = [
  "$ python --version    → 3.x",
  "$ pip install torch   → ✓",
  "$ docker compose up   → 🚀",
  "$ git push origin main → ✓",
  "$ jupyter lab         → ✨",
  "$ python train.py     → 90.2% acc",
];
