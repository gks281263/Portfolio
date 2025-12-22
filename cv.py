from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Flowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, black

SECTION_COLOR = HexColor("#2e3a59")

class HRLine(Flowable):
    def __init__(self, width=0.9, color=SECTION_COLOR, space_before=0.3, space_after=0.3):
        super().__init__()
        self.width = width
        self.color = color
        self.space_before = space_before
        self.space_after = space_after

    def wrap(self, availWidth, availHeight):
        self._avail_width = availWidth
        return (availWidth, self.space_before + self.space_after)

    def draw(self):
        self.canv.saveState()
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.width)
        self.canv.line(0, 0, self._avail_width, 0)
        self.canv.restoreState()

def get_exact_styles():
    return {
        "Name": ParagraphStyle("Name", fontName="Helvetica-Bold", fontSize=14.5, textColor=SECTION_COLOR, leading=18, spaceAfter=3),
        "Contact": ParagraphStyle("Contact", fontName="Helvetica", fontSize=10, textColor=black, leading=12, spaceAfter=6),
        "SectionHeader": ParagraphStyle("SectionHeader", fontName="Helvetica-Bold", fontSize=13, textColor=SECTION_COLOR, leading=15, spaceBefore=5, spaceAfter=3),
        "Normal": ParagraphStyle("Normal", fontName="Helvetica", fontSize=10, textColor=black, leading=12, spaceAfter=3),
        "Bullet": ParagraphStyle("Bullet", fontName="Helvetica", fontSize=10, textColor=black, leading=12, leftIndent=12, bulletIndent=5, spaceAfter=2),
        "BigColored": ParagraphStyle("BigColored", fontName="Helvetica-Bold", fontSize=11, textColor=SECTION_COLOR, leading=13, spaceAfter=2)
    }

def build_content():
    return [
        ("Name", "GAURAV KUMAR"),
        ("Contact", "Vadodara, Gujarat - +91 6205829376 - gks281263@gmail.com - LinkedIn: <link href='https://www.linkedin.com/in/gauravkumar7777/' color='blue'>gauravkumar7777</link>"),

        ("SectionHeader", "PROFESSIONAL SUMMARY"),
        ("Normal", "Backend Engineer with experience building production-grade systems from scratch using Django and FastAPI, owning system architecture, database design, and API infrastructure end to end. Implemented secure authentication, financial payout workflows with immutable data patterns, and high-performance REST APIs focused on correctness, reliability, and data integrity. Experienced in KPI-driven backend optimization (latency, error rates, consistency) with exposure to AWS-based deployment planning, containerized deployments, and infrastructure-aware backend engineering."),
        ("HR", None),

        ("SectionHeader", "EXPERIENCE"),
        ("BigColored", "Backend Developer Intern | Loopinx Circle | October 2025 – December 2025"),
        ("Bullet", "- Designed and implemented a production-grade backend from scratch, owning system architecture, database schema design, ER diagrams, and technical documentation using Django and FastAPI."),
        ("Bullet", "- Architected a modular monolith backend with domain-isolated services (authentication, events, payments, analytics), integrating Django ORM with FastAPI via ASGI for scalable API delivery."),
        ("Bullet", "- Built secure authentication and authorization systems, including phone-based OTP, JWT authentication, role-based access control, and object-level permissions."),
        ("Bullet", "- Developed high-performance REST APIs and deployment infrastructure, optimizing database queries, implementing middleware and global error handling, and containerizing the system with Docker and Nginx for production readiness."),

        ("BigColored", "Backend Developer Intern | AiiQA Powered by Code2Tech Innovation Pvt. Ltd | May 2025 - Aug 2025"),
        ("Bullet", "- Developed backend services, modules, and RESTful APIs using Django Rest Framework (DRF)."),
        ("Bullet", "- Dockerized the complete project for consistent deployment."),
        ("Bullet", "- Designed and implemented secure software architecture while optimizing code performance."),
        ("Bullet", "- Collaborated on API documentation and system integration for scalable applications."),

        ("BigColored", "Co-Founder | Promotionia (Startup) | June 2023 - March 2025"),
        ("Bullet", "- Built and maintained full-stack web platforms using PHP to support marketing campaigns and order processing."),
        ("Bullet", "- Automated operational workflows using Python and Google Sheets, reducing manual effort by ~90%."),
        ("Bullet", "- Led and coordinated a 15-member team, improving operational efficiency and execution speed."),
        ("HR", None),

        ("SectionHeader", "TECHNICAL SKILLS"),
        ("Normal", "Backend & Systems: REST API Design, FastAPI, System Architecture, Modular Monoliths, Authentication & Authorization, Database Design, Query Optimization"),
        ("Normal", "Programming Languages: Python, Go, JavaScript, TypeScript, C, PHP, Rust"),
        ("Normal", "Backend Frameworks & Libraries: Django, Node.js, React"),
        ("Normal", "Databases: PostgreSQL, SQL, SQLite"),
        ("Normal", "Deployment, DevOps & Infrastructure: Docker, Nginx, AWS (Foundational), Git, GitHub Actions"),
        ("Normal", "Security & Networking Tools: Burp Suite, OWASP ZAP, Metasploit, Wireshark, Nmap, Bettercap"),
        ("Normal", "Soft Skills: Problem Decomposition, System Thinking, Technical Documentation, Team Leadership, Ownership & Accountability, Decision-Making"),
        ("HR", None),

        ("SectionHeader", "PROJECTS"),
        ("BigColored", "Telegram Keylogger (Rust)"),
        ("Bullet", "- Developed a custom keylogger for ethical research, transmitting logs securely to Telegram using the Bot API."),
        ("BigColored", "Peer-to-Peer Lending Platform (React + Django)"),
        ("Bullet", "- Designed a dynamic platform allowing users to rent or lend various categories of items securely."),
        ("BigColored", "Anonymous Chat Website (Node.js + WebSocket)"),
        ("Bullet", "- Built a real-time chat application similar to Omegle."),
        ("HR", None),

        ("SectionHeader", "EDUCATION"),
        ("Normal", "Parul University - BTech, Computer Science (Cyber Security)"),
        ("Normal", "Expected Graduation: 2028"),
        ("HR", None),

        ("SectionHeader", "CERTIFICATIONS"),
        ("BigColored", "Software Engineering Job Simulation — JPMorgan Chase & Co. (via Forage)"),
        ("Normal", "Issued: Dec 2025"),
        ("Normal", "Completed hands-on backend engineering tasks including project setup, Kafka and H2 integration, REST API development, and controller design within enterprise-style workflows."),
        ("Normal", "Verification Code: mbwqzMzvCS6JaJa3q"),
        
        ("BigColored", "Palo Alto Networks Academy"),
        ("Bullet", "- Network Security Fundamentals | Issued: October 2025"),
        ("Normal", "Credential ID: RUT6x5pmTM"),
        ("Bullet", "- Cybersecurity Foundation | Issued: May 2025"),
        ("Normal", "Credential ID: 3ymKKfaihz"),
        ("HR", None),
    ]

def create_pdf(output_path="GauravCV.pdf"):
    styles = get_exact_styles()

    doc = SimpleDocTemplate(output_path, pagesize=A4, leftMargin=28, rightMargin=28, topMargin=20, bottomMargin=20)
    story = []

    for style_key, text in build_content():
        if style_key == "HR":
            story.append(HRLine())
        else:
            if style_key == "SectionHeader":
                text = text.upper()
            story.append(Paragraph(text, styles[style_key]))

    doc.build(story)
    print("PDF created:", output_path)

if __name__ == "__main__":
    create_pdf()

