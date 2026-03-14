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
        ("Normal", "Backend and Platform Engineer with experience building production-grade systems from scratch using Django, FastAPI, Terraform, and AWS. Owned system architecture, database design, API infrastructure, and cloud deployment end to end. Engineered secure authentication, financial payout workflows with immutable data patterns, and production-grade IaC covering VPC, ECS Fargate, RDS, ElastiCache, WAF, and CI/CD pipelines. Focused on correctness, reliability, data integrity, and infrastructure security."),
        ("HR", None),

        ("SectionHeader", "EXPERIENCE"),
        ("BigColored", "Platform Engineer Intern | Loopinx Circle | January 2026 – March 2026"),
        ("Bullet", "- Authored production-grade Infrastructure as Code using Terraform, provisioning a complete AWS stack — VPC with multi-AZ public/private subnets, ECS Fargate, RDS PostgreSQL, ElastiCache Redis (TLS + auth), ALB (TLS 1.2/1.3), S3, ECR, and KMS encryption."),
        ("Bullet", "- Implemented least-privilege security architecture: WAF with managed rules and rate limiting, security groups restricting data stores to ECS-only access, VPC endpoints to eliminate public internet egress, and S3 bucket policies scoped to ECS task IAM roles."),
        ("Bullet", "- Designed CI/CD pipelines using GitHub Actions for automated ECR image builds and ECS force-new-deployment with concurrency control and deployment circuit breakers."),
        ("Bullet", "- Configured centralized secrets management via AWS Secrets Manager, structured JSON logging to CloudWatch, Container Insights monitoring, and multi-stage Docker builds with non-root execution for production hardening."),

        ("BigColored", "Backend Developer Intern | Loopinx Circle | October 2025 – December 2025"),
        ("Bullet", "- Designed and built a modular monolith backend from scratch using Django + FastAPI hybrid architecture, owning system design, database modeling, and 38+ technical documentation files across 9 domain-isolated Django apps."),
        ("Bullet", "- Engineered a financial system with immutable snapshot patterns, transaction atomicity across 51+ operations, retry chains with parent-order tracking, and payment webhook verification (hash + IP validation + rate limiting) ensuring data integrity."),
        ("Bullet", "- Built a state machine-driven support system with validated transitions, concurrency control via select_for_update, reopen abuse detection, and a JSON-based rule engine with policy scoping and SLA tracking."),
        ("Bullet", "- Implemented secure auth (phone OTP with rate limiting + expiry, JWT, RBAC), a custom exception hierarchy with 10 typed exceptions, and production security posture including HSTS, secure cookies, S3 media proxy URLs, and pre-commit security linting."),

        ("BigColored", "Backend Developer Intern | AiiQA Powered by Code2Tech Innovation Pvt. Ltd | May 2025 - Aug 2025"),
        ("Bullet", "- Developed backend services, modules, and RESTful APIs using Django Rest Framework (DRF)."),
        ("Bullet", "- Dockerized the complete project for consistent deployment."),
        ("Bullet", "- Designed and implemented secure software architecture while optimizing code performance."),
        ("Bullet", "- Collaborated on API documentation and system integration for scalable applications."),

        ("BigColored", "Ex Co-Founder | Promotionia (Startup – Closed) | June 2023 - March 2025"),
        ("Bullet", "- Built and maintained full-stack web platforms using PHP to support marketing campaigns and order processing."),
        ("Bullet", "- Automated operational workflows using Python and Google Sheets, reducing manual effort by ~90%."),
        ("Bullet", "- Led and coordinated a 15-member team, improving operational efficiency and execution speed."),
        ("HR", None),

        ("SectionHeader", "TECHNICAL SKILLS"),
        ("Normal", "Backend & Systems: REST API Design, FastAPI, System Architecture, Modular Monoliths, Authentication & Authorization, Database Design, Query Optimization"),
        ("Normal", "Programming Languages: Python, Go, JavaScript, TypeScript, C, PHP, Rust"),
        ("Normal", "Backend Frameworks & Libraries: Django, Node.js, React"),
        ("Normal", "Databases: PostgreSQL, SQL, SQLite"),
        ("Normal", "Deployment, DevOps & Infrastructure: Terraform (IaC), AWS (VPC, ECS Fargate, RDS, ElastiCache, S3, ALB, WAF, KMS, Secrets Manager), Docker, Nginx, Git, GitHub Actions CI/CD"),
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

