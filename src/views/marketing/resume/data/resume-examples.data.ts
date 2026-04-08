// src/data/resume-examples.data.ts

import type { IndustryCategory } from '../types/resume.types';

const IMG1 = 'https://resume.io/cdn-cgi/image/width=544,height=480,dpr=1.24,fit=crop,gravity=top,quality=75,format=auto/assets/templates/new_york-afac6df9.jpg';
const IMG2 = '/assets/images/templates/template-stockholm-traditional.jpg';

export const CATEGORIES: string[] = [
    'All Examples', 'Education', 'Government', 'Engineering',
    'Retail', 'Legal', 'Maintenance & Repair', 'Administrative',
    'Human Resource', 'Real Estate', 'Sales', 'Production',
    'Marketing', 'Accounting & Finance', 'Business & Management',
    'Security & Protective Services', 'Hospitality & Catering',
    'Transport & Logistics', 'Transportation', 'Medical',
    'Information Technology', 'Sport & Fitness', 'Social Work',
    'Construction', 'Beauty & Wellness', 'Student', 'Creative & Artistic'
];

export const INDUSTRY_DATA: IndustryCategory[] = [
    {
        id: 'education',
        title: 'Education',
        count: 35,
        description: "A great education resume is like a well-planned lesson; it gets to the objective in an engaging manner. Our education resume examples help you graduate from applicant to employee.",
        iconName: 'BookOpen',
        primaryExamples: [
            { title: 'College Admissions', imageUrl: IMG1 },
            { title: 'Teacher', imageUrl: IMG2 },
            { title: 'College Professor', imageUrl: IMG1 },
            { title: 'Elementary School Teacher', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'ESL Teacher' },
            { title: 'Teacher Assistant' },
            { title: 'High School Teacher' },
            { title: 'Early Childhood Educator' },
        ]
    },
    {
        id: 'government',
        title: 'Government',
        count: 5,
        description: "Cut through government hiring complexities. Our tailored examples follow precise agency protocols, transforming your experience into a resume that will give hiring managers a vote of confidence in your candidacy.",
        iconName: 'Landmark',
        primaryExamples: [
            { title: 'Federal', imageUrl: IMG2 },
            { title: 'Correctional Officer', imageUrl: IMG1 },
            { title: 'City Manager', imageUrl: IMG2 },
            { title: 'Postal Service Worker', imageUrl: IMG1 },
        ],
        secondaryExamples: [
            { title: 'Government' },
        ]
    },
    {
        id: 'engineering',
        title: 'Engineering',
        count: 15,
        description: "In the world of engineering, a solid resume is the blueprint for career success. We've calculated the perfect formula for showcasing your technical talents and building interview opportunities.",
        iconName: 'Wrench',
        primaryExamples: [
            { title: 'Civil Engineer', imageUrl: IMG1 },
            { title: 'Electrical Engineer', imageUrl: IMG2 },
            { title: 'Mechanical Engineer', imageUrl: IMG1 },
            { title: 'Technician', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Process Engineer' },
            { title: 'Structural Engineer' },
            { title: 'Agricultural Engineer' },
            { title: 'Health and Safety Engineer' },
        ]
    },
    {
        id: 'retail',
        title: 'Retail',
        count: 20,
        description: "Stock your resume with retail-ready content that catches hiring managers' attention. Our examples help you ring up more interviews, whether you're a first-time cashier or seasoned floor manager.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Store Manager', imageUrl: IMG1 },
            { title: 'Shop Assistant', imageUrl: IMG2 },
            { title: 'Retail Manager', imageUrl: IMG1 },
            { title: 'Cashier', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Retail Cashier' },
            { title: 'Art Gallery Manager' },
            { title: 'Ikea' },
            { title: 'Coffee Shop Manager' },
        ]
    },
    {
        id: 'legal',
        title: 'Legal',
        count: 10,
        description: "Draft a resume that delivers compelling evidence. Show that you can explain complex legal ideas clearly, dig into details and juggle deadlines - leaving hiring managers with a simple verdict: Interview this candidate.",
        iconName: 'Landmark',
        primaryExamples: [
            { title: 'Lawyer', imageUrl: IMG1 },
            { title: 'Attorney', imageUrl: IMG2 },
            { title: 'Legal Assistant', imageUrl: IMG1 },
            { title: 'Paralegal', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Claims Adjuster' },
            { title: 'Immigration Lawyer' },
            { title: 'Legal' },
            { title: 'Law School' },
        ]
    },
    {
        id: 'maintenance-repair',
        title: 'Maintenance & Repair',
        count: 16,
        description: "Craft a resume that's as dependable as your handiwork. With a focus on safety, teamwork, and measurable results, it shows employers you're the one they can count on when things need fixing fast.",
        iconName: 'Wrench',
        primaryExamples: [
            { title: 'Housekeeping', imageUrl: IMG1 },
            { title: 'Electrician', imageUrl: IMG2 },
            { title: 'Plumber', imageUrl: IMG1 },
            { title: 'Mechanic', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Handyman' },
            { title: 'Maintenance Technician' },
            { title: 'Carpenter' },
            { title: 'Custodian' },
        ]
    },
    {
        id: 'administrative',
        title: 'Administrative',
        count: 19,
        description: "Organize your career future as expertly as you organize offices. Our administrative resume examples and AI builder help you file away job search stress and retrieve that perfect position.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Customer Service Representative', imageUrl: IMG1 },
            { title: 'Administrative Assistant', imageUrl: IMG2 },
            { title: 'Call Center Agent', imageUrl: IMG1 },
            { title: 'Office Administrator', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Receptionist' },
            { title: 'Office Secretary' },
            { title: 'Office Assistant' },
            { title: 'Business Manager' },
        ]
    },
    {
        id: 'human-resource',
        title: 'Human Resource',
        count: 11,
        description: "Craft an HR resume that recruits the recruiter. Our expert examples and AI builder help you showcase your talent for spotting talent, turning your application into your first successful hire.",
        iconName: 'Users',
        primaryExamples: [
            { title: 'Entry Level HR', imageUrl: IMG1 },
            { title: 'Human Resources Manager', imageUrl: IMG2 },
            { title: 'Human Resources Assistant', imageUrl: IMG1 },
            { title: 'Recruiter', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Human Resources' },
            { title: 'HR Director' },
            { title: 'Chief Happiness Officer (CHO)', href: '/resume-examples/chief-happiness-officer' },
            { title: 'Human Resource Generalist' },
        ]
    },
    {
        id: 'real-estate',
        title: 'Real Estate',
        count: 14,
        description: "Elevate your market value with real estate resume examples that help you close the deal on your next role. Our smart tools ensure your application has the curb appeal to attract hiring managers.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Real Estate Agent', imageUrl: IMG1 },
            { title: 'Interior Designer', imageUrl: IMG2 },
            { title: 'New Home Sales Consultant', imageUrl: IMG1 },
            { title: 'Architect', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Property Manager' },
            { title: 'Realtor' },
            { title: 'Real Estate Assistant' },
            { title: 'Interior Decorator' },
        ]
    },
    {
        id: 'sales',
        title: 'Sales',
        count: 15,
        description: "Pitch yourself perfectly with our sales resume collection. We've negotiated the hard parts of resume writing so you can focus on closing your next career opportunity.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Sales Manager', imageUrl: IMG1 },
            { title: 'Sales Assistant', imageUrl: IMG2 },
            { title: 'Account Executive', imageUrl: IMG1 },
            { title: 'Sales Representative', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Account Manager' },
            { title: 'Sales Associate' },
            { title: 'Telemarketer' },
            { title: 'Car Sales' },
        ]
    },
    {
        id: 'production',
        title: 'Production',
        count: 13,
        description: "Transform raw materials into polished opportunities with our production resume examples. Our AI-powered tools help you manufacture a standout application that captures your hands-on expertise.",
        iconName: 'Wrench',
        primaryExamples: [
            { title: 'Quality Assurance', imageUrl: IMG1 },
            { title: 'Production Worker', imageUrl: IMG2 },
            { title: 'Operations Manager', imageUrl: IMG1 },
            { title: 'Welder', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Forklift Operator' },
            { title: 'Manufacturing Technician' },
            { title: 'Machine Operator' },
            { title: 'Material Handler' },
        ]
    },
    {
        id: 'marketing',
        title: 'Marketing',
        count: 28,
        description: "Market yourself as effectively as you market products with resumes that highlight your strategic thinking and measurable impact. Our examples help you craft a personal brand that resonates with employers and drives results.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Digital Marketing Manager', imageUrl: IMG1 },
            { title: 'Marketing Manager', imageUrl: IMG2 },
            { title: 'Social Media Manager', imageUrl: IMG1 },
            { title: 'Marketing Associate', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Art Director' },
            { title: 'Digital Marketing' },
            { title: 'Event Planner' },
            { title: 'Content Writer' },
        ]
    },
    {
        id: 'accounting-finance',
        title: 'Accounting & Finance',
        count: 30,
        description: "Crunch the numbers in your favor with our accounting and finance resume examples. We've done the calculations - these templates are your formula for standing out in a competitive market.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Accountant', imageUrl: IMG1 },
            { title: 'Financial Analyst', imageUrl: IMG2 },
            { title: 'Banker', imageUrl: IMG1 },
            { title: 'Financial Advisor', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Bookkeeper' },
            { title: 'Bank Manager' },
            { title: 'Compliance Officer' },
            { title: 'Senior Accountant' },
        ]
    },
    {
        id: 'business-management',
        title: 'Business & Management',
        count: 37,
        description: "Navigate your career journey with confidence using our business resume examples. From boardroom pitches to management strategies, we'll help you showcase your professional prowess in just a few clicks.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Project Manager', imageUrl: IMG1 },
            { title: 'Business Analyst', imageUrl: IMG2 },
            { title: 'Product Manager', imageUrl: IMG1 },
            { title: 'Executive', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Manager' },
            { title: 'Business Development Manager' },
            { title: 'Consultant' },
            { title: 'Chief of Staff' },
        ]
    },
    {
        id: 'security-protective',
        title: 'Security & Protective Services',
        count: 7,
        description: "Stand guard over your career with our security resume examples. From patrol officers to firefighters, we'll help you safeguard your professional future in minutes.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Security Guard', imageUrl: IMG1 },
            { title: 'Military', imageUrl: IMG2 },
            { title: 'Police Officer', imageUrl: IMG1 },
            { title: 'Firefighter', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Security Officer' },
            { title: 'Security and protective services' },
            { title: 'Volunteer Firefighter' },
        ]
    },
    {
        id: 'hospitality-catering',
        title: 'Hospitality & Catering',
        count: 31,
        description: "Cook up career success with hospitality resume examples that showcase your talents perfectly. Whether you're front-of-house or behind the scenes, we'll help you create a resume that's always on the menu for top employers.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Chef', imageUrl: IMG1 },
            { title: 'Cook', imageUrl: IMG2 },
            { title: 'Barista', imageUrl: IMG1 },
            { title: 'Waitress', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Restaurant Manager' },
            { title: 'Bartender' },
            { title: 'Server' },
            { title: 'Pastry Chef' },
        ]
    },
    {
        id: 'transport-logistics',
        title: 'Transport & Logistics',
        count: 16,
        description: "Ship your career to new destinations with our specialized transport and logistics resume examples. We'll help you map the route to your next professional opportunity with precision.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Truck Driver', imageUrl: IMG1 },
            { title: 'Warehouse Worker', imageUrl: IMG2 },
            { title: 'Logistics Coordinator', imageUrl: IMG1 },
            { title: 'Delivery Driver', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Warehouse Manager' },
            { title: 'Package Handler' },
            { title: 'Stock Clerk' },
            { title: 'Order Filler' },
        ]
    },
    {
        id: 'transportation',
        title: 'Transportation',
        count: 10,
        description: "Steer your job hunt in the right direction with our transportation resume examples. We'll help you shift gears from job-seeker to hired professional with templates that deliver results.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Seaman', imageUrl: IMG1 },
            { title: 'Driver', imageUrl: IMG2 },
            { title: 'Flight Attendant', imageUrl: IMG1 },
            { title: 'Pilot', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Bus Driver' },
            { title: 'Airline Pilot' },
            { title: 'Train Operator' },
            { title: 'Transportation' },
        ]
    },
    {
        id: 'medical',
        title: 'Medical',
        count: 75,
        description: "From scrubs to stethoscopes, our medical resume examples help healthcare heroes showcase their lifesaving skills. We'll help you highlight your vital skills—no second opinion needed.",
        iconName: 'Stethoscope',
        primaryExamples: [
            { title: 'Doctor', imageUrl: IMG1 },
            { title: 'Nurse', imageUrl: IMG2 },
            { title: 'Dentist', imageUrl: IMG1 },
            { title: 'Nursing Student', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Pharmacist' },
            { title: 'Physical Therapist' },
            { title: 'Dental Assistant' },
            { title: 'Optometrist' },
        ]
    },
    {
        id: 'information-technology',
        title: 'Information Technology (IT)',
        count: 51,
        description: "Tech changes fast, but your resume doesn't have to struggle. Our IT examples show you exactly how to showcase your digital skills with language that speaks to both humans and ATS systems.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Web Developer', imageUrl: IMG1 },
            { title: 'Software Developer', imageUrl: IMG2 },
            { title: 'Programmer', imageUrl: IMG1 },
            { title: 'Data Analyst', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Data Scientist' },
            { title: 'IT Manager' },
            { title: 'Software Engineer' },
            { title: 'SOC Analyst' },
        ]
    },
    {
        id: 'sport-fitness',
        title: 'Sport & Fitness',
        count: 23,
        description: "Sprint ahead of the competition with our sports and fitness resume examples. We'll help you flex your professional muscles and score that dream job.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Fitness Instructor', imageUrl: IMG1 },
            { title: 'Yoga Instructor', imageUrl: IMG2 },
            { title: 'Personal Trainer', imageUrl: IMG1 },
            { title: 'Lifeguard', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Football Coach' },
            { title: 'Soccer Coach' },
            { title: 'Basketball Coach' },
            { title: 'Student Athlete' },
        ]
    },
    {
        id: 'social-work',
        title: 'Social Work',
        count: 15,
        description: "Craft a resume that cares as much as you do. Our social work examples help you showcase both your professional qualifications and your heart for helping others.",
        iconName: 'Users',
        primaryExamples: [
            { title: 'Nanny', imageUrl: IMG1 },
            { title: 'Caregiver', imageUrl: IMG2 },
            { title: 'Social Worker', imageUrl: IMG1 },
            { title: 'Babysitter', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Case Manager' },
            { title: 'Community Outreach Coordinator' },
            { title: 'Juvenile Counselor' },
            { title: 'Counselor' },
        ]
    },
    {
        id: 'construction',
        title: 'Construction',
        count: 8,
        description: "Lay the foundation for your next construction opportunity with resumes that showcase your skills. Our AI-powered builder helps you frame your experience perfectly, no hard hat required.",
        iconName: 'Wrench',
        primaryExamples: [
            { title: 'Construction Manager', imageUrl: IMG1 },
            { title: 'Construction Worker', imageUrl: IMG2 },
            { title: 'General Laborer', imageUrl: IMG1 },
            { title: 'Construction', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Contractor' },
            { title: 'Construction Project Manager' },
            { title: 'Construction Superintendent' },
            { title: 'Glazier' },
        ]
    },
    {
        id: 'beauty-wellness',
        title: 'Beauty & Wellness',
        count: 14,
        description: "Polish your career path with our beauty and wellness resume examples that help you shine as brightly as your clients do. Transform your experience into an application that turns heads and opens doors.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Hair Stylist', imageUrl: IMG1 },
            { title: 'Nail Technician', imageUrl: IMG2 },
            { title: 'Massage Therapist', imageUrl: IMG1 },
            { title: 'Aesthetician', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Spa Manager' },
            { title: 'Salon Receptionist' },
            { title: 'Wellness Manager' },
            { title: 'Beauty and wellness' },
        ]
    },
    {
        id: 'student',
        title: 'Student',
        count: 11,
        description: "Turn classroom achievements into job-winning credentials. These student resume examples bridge the gap between academic success and professional opportunity.",
        iconName: 'BookOpen',
        primaryExamples: [
            { title: 'Student', imageUrl: IMG1 },
            { title: 'Internship', imageUrl: IMG2 },
            { title: 'College Student', imageUrl: IMG1 },
            { title: 'High School Student', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Teen' },
            { title: 'Summer Job' },
            { title: 'Graduate School' },
            { title: 'PhD' },
        ]
    },
    {
        id: 'creative-artistic',
        title: 'Creative and Artistic',
        count: 27,
        description: "Unleash your creative flair with resume examples that stand out like your talent does. We help you craft a visually striking application that captures both your artistic vision and professional expertise.",
        iconName: 'Briefcase',
        primaryExamples: [
            { title: 'Actor', imageUrl: IMG1 },
            { title: 'Photographer', imageUrl: IMG2 },
            { title: 'Screenwriter', imageUrl: IMG1 },
            { title: 'Visual Artist', imageUrl: IMG2 },
        ],
        secondaryExamples: [
            { title: 'Cinematographer' },
            { title: 'Fashion Designer' },
            { title: 'Voice Actor' },
            { title: 'Costume Designer' },
            { title: 'Stage Manager' },
            { title: 'Fashion Buyer' },
            { title: 'Tailor' },
            { title: 'Illustrator' },
            { title: 'Floral Designer' },
            { title: 'Theatre' },
            { title: 'Landscape Designer' },
            { title: 'Wedding Photographer' },
            { title: 'Film Producer' },
            { title: 'Modeling' },
            { title: 'Jewelry Designer' },
            { title: 'Choreographer' },
            { title: 'Tattoo Artist' },
            { title: 'Musician' },
            { title: 'Videographer' },
            { title: 'Artist' },
            { title: 'Barber' },
            { title: 'Dance Teacher' },
            { title: 'Musical Theater' },
        ]
    },
];
