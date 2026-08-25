(function () {
  'use strict';

  const CATEGORY_LABEL = {
    network: 'Networking',
    hardware: 'Hardware & Embedded',
    software: 'Software'
  };

  const PROJECTS = [
    {
      name: 'network-lab-visualizer',
      category: 'network',
      description: 'Interactive browser network simulator — build a topology, send a ping, and watch ARP, MAC learning, longest-prefix routing, and TTL work hop by hop.',
      tech: ['JavaScript', 'Canvas'],
      repo: 'https://github.com/5amuel02/network-lab-visualizer'
    },
    {
      name: 'net-toolkit',
      category: 'network',
      description: 'Command-line networking utilities — subnet calculator, port scanner, ping sweep, DNS lookup.',
      tech: ['Python', 'Sockets'],
      repo: 'https://github.com/5amuel02/net-toolkit'
    },
    {
      name: 'tcp-handshake-visualizer',
      category: 'network',
      description: "Interactive visualization of TCP's 3-way handshake, packet loss/retransmission with RTO backoff, congestion window growth, and 4-way teardown.",
      tech: ['JavaScript', 'TCP/IP'],
      repo: 'https://github.com/5amuel02/tcp-handshake-visualizer',
      demo: 'https://5amuel02.github.io/tcp-handshake-visualizer/'
    },
    {
      name: 'PID Robotic Arm',
      category: 'hardware',
      description: 'Joystick-controlled 3-axis robotic arm with independent PID position control per axis. Control Systems course project, with full step-response analysis.',
      tech: ['Arduino', 'C++', 'PID Control'],
      repo: 'https://github.com/5amuel02/pid-robotic-arm-control'
    },
    {
      name: 'Crack Monitoring Application',
      category: 'hardware',
      description: 'Android client for real-time drone-based structural crack monitoring, with live YOLO detection status and stream latency tracking.',
      tech: ['Kotlin', 'YOLO', 'Flask'],
      repo: 'https://github.com/5amuel02/CrackMonitoringApplication'
    },
    {
      name: 'Rice Plant Health Detection',
      category: 'hardware',
      description: 'Android + Flask app pairing a phone camera with color-based leaf health analysis, with scan history.',
      tech: ['Kotlin', 'Flask', 'OpenCV'],
      repo: 'https://github.com/5amuel02/RicePlantHealthDetectionApplication'
    },
    {
      name: 'LifeOS',
      category: 'software',
      description: 'Local-first personal life-management Android app — habits, budgeting, notes, and a 31-game bilingual learning suite. Zero backend, zero tracking.',
      tech: ['Kotlin', 'Jetpack Compose', 'Room'],
      repo: 'https://github.com/5amuel02/LifeOS'
    },
    {
      name: 'Kantin Digital — SMP N 1 Simanindo',
      category: 'software',
      description: 'Full-stack ordering site built for a real client — a school canteen. Menu catalog with image uploads, plus an admin panel for CRUD and stock status.',
      tech: ['Next.js', 'Prisma', 'PostgreSQL'],
      repo: 'https://github.com/5amuel02/kantin-smp-n1-simanindo',
      demo: 'https://kantin-smp-n1-simanindo-ip5abmrm2-legalation.vercel.app/'
    },
    {
      name: 'fullstack-todo-list',
      category: 'software',
      description: 'Layered Express + MySQL REST API with a vanilla-JS frontend — input validation, centralized error handling, an automated test suite, and CI.',
      tech: ['Node.js', 'Express', 'MySQL'],
      repo: 'https://github.com/5amuel02/fullstack-todo-list'
    },
    {
      name: 'cybersafe-kids',
      category: 'software',
      description: 'AI-powered (Google Gemini) cybersecurity education platform for kids — gamified lessons on digital safety, privacy, and phishing awareness.',
      tech: ['Python', 'Flask', 'Google Gemini'],
      repo: 'https://github.com/5amuel02/cybersafe-kids'
    },
    {
      name: 'AnimeVerse',
      category: 'software',
      description: 'Anime search & discovery platform with genre-based smart recommendations and a weekly airing schedule.',
      tech: ['React', 'Vite', 'Tailwind CSS'],
      repo: 'https://github.com/5amuel02/animeverse',
      demo: 'https://5amuel02.github.io/animeverse/'
    },
    {
      name: 'solar-system-website',
      category: 'software',
      description: 'Interactive 3D solar system built from scratch — orbit camera controls, an asteroid belt and comets, a guided "Voyager Journey" mode.',
      tech: ['JavaScript', 'Three.js'],
      repo: 'https://github.com/5amuel02/solar-system-website',
      demo: 'https://5amuel02.github.io/solar-system-website/'
    }
  ];

  const SKILLS = [
    { group: 'Languages', items: ['Kotlin', 'Java', 'Python', 'C++', 'C', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
    { group: 'Networking & Systems', items: ['TCP/IP', 'Subnetting', 'Wireshark', 'Cisco Packet Tracer', 'Linux', 'Bash'] },
    { group: 'Embedded & Hardware', items: ['Arduino', 'PID Control', 'Digital Signal Analysis'] },
    { group: 'Frontend & Mobile', items: ['Jetpack Compose', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Three.js'] },
    { group: 'Backend & Data', items: ['Node.js', 'Express', 'Flask', 'PostgreSQL', 'MySQL', 'SQLite', 'Firebase'] },
    { group: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Figma'] }
  ];

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (key === 'class') node.className = value;
        else if (key.startsWith('on') && typeof value === 'function') {
          node.addEventListener(key.slice(2), value);
        } else {
          node.setAttribute(key, value);
        }
      }
    }
    for (const child of children) {
      if (child == null) continue;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
  }

  function renderProjects() {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = '';

    for (const project of PROJECTS) {
      const techPills = project.tech.map((t) => el('span', { class: 'tech-pill' }, t));
      const links = [el('a', { href: project.repo, target: '_blank', rel: 'noopener' }, 'Source ↗')];
      if (project.demo) {
        links.push(el('a', { href: project.demo, target: '_blank', rel: 'noopener' }, 'Live demo ↗'));
      }

      const card = el('div', { class: 'project-card', 'data-category': project.category },
        el('div', { class: 'project-card-top' },
          el('h3', null, el('a', { href: project.repo, target: '_blank', rel: 'noopener' }, project.name)),
          el('span', { class: `category-pill category-${project.category}` }, CATEGORY_LABEL[project.category])
        ),
        el('p', null, project.description),
        el('div', { class: 'project-tech' }, ...techPills),
        el('div', { class: 'project-links' }, ...links)
      );
      grid.appendChild(card);
    }
  }

  function renderSkills() {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';
    for (const group of SKILLS) {
      const pills = group.items.map((item) => el('span', { class: 'skill-pill' }, item));
      grid.appendChild(
        el('div', { class: 'skill-group' },
          el('h4', null, group.group),
          el('div', { class: 'skill-pills' }, ...pills)
        )
      );
    }
  }

  function setupFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = () => document.querySelectorAll('.project-card');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        cards().forEach((card) => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.hidden = !show;
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderSkills();
    setupFilters();
  });
})();
