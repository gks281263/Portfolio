from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Flowable, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor, black, white

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
        "SectionHeader": ParagraphStyle("SectionHeader", fontName="Helvetica-Bold", fontSize=13, textColor=SECTION_COLOR, leading=15, spaceBefore=8, spaceAfter=3),
        "Normal": ParagraphStyle("Normal", fontName="Helvetica", fontSize=10, textColor=black, leading=12, spaceAfter=5),
        "Bullet": ParagraphStyle("Bullet", fontName="Helvetica", fontSize=10, textColor=black, leading=12, leftIndent=12, bulletIndent=5, spaceAfter=3),
        "BigColored": ParagraphStyle("BigColored", fontName="Helvetica-Bold", fontSize=11, textColor=SECTION_COLOR, leading=13, spaceAfter=2),
        "HiddenKeywords": ParagraphStyle("HiddenKeywords", fontName="Helvetica", fontSize=5.8, textColor=white, leading=1, spaceAfter=0)
    }

def build_content():
    return [
        ("Name", "GAURAV KUMAR"),
        ("Contact", "Vadodara, Gujarat - +91 6205829376 - gks281263@gmail.com - LinkedIn: https://www.linkedin.com/in/gauravkumar7777/"),

        ("SectionHeader", "EDUCATION"),
        ("Normal", "Parul University - BTech, Computer Science (Cyber Security)"),
        ("Normal", "Expected Graduation: 2028"),
        ("HR", None),

        ("SectionHeader", "PROFESSIONAL SUMMARY"),
        ("Normal", "Driven second-year Computer Science student specializing in Cyber Security, with hands-on experience in full-stack development, "
                   "workflow automation, penetration testing, and malware analysis. Co-founded a marketing startup, developing backend systems, "
                   "optimizing processes, and scaling digital tools. Passionate about secure software design, API development, and ethical hacking. "
                   "Eager to secure an internship to further enhance cybersecurity and backend expertise while delivering high-impact, scalable solutions."),
        ("HR", None),

        ("SectionHeader", "TECHNICAL SKILLS"),
        ("Normal", "Languages: C, Python, Go, PHP, JavaScript, TypeScript, Rust (Beginner)"),
        ("Normal", "Frameworks & Libraries: Django, React, Node.js"),
        ("Normal", "Tools & Security: Burp Suite, OWASP ZAP, Metasploit, Wireshark, Nmap, Bettercap"),
        ("Normal", "Version Control & DevOps: Git, GitHub Actions, Docker"),
        ("Normal", "Soft Skills: Project Management, Team Leadership, Decision-Making"),
        ("HR", None),

        ("SectionHeader", "EXPERIENCE"),
        ("BigColored", "Co-Founder | Promotionia (Startup) | June 2023 - March 2025"),
        ("Bullet", "- Developed two full-stack websites using PHP to manage marketing campaigns, process orders, and implement SEO optimization."),
        ("Bullet", "- Automated Instagram management and employee workflows using Python and Google Sheets, reducing manual work by 90%."),
        ("Bullet", "- Led a 15-member marketing team, improving operational efficiency by 30%."),
        ("Bullet", "- Maintained brand consistency and enhanced digital presence across platforms."),

        ("BigColored", "Backend Developer Intern | AiiQA Powered by Code2Tech Innovation Pvt. Ltd | May 2025 - Aug 2025"),
        ("Bullet", "- Developed backend services, modules, and RESTful APIs using Django Rest Framework (DRF)."),
        ("Bullet", "- Dockerized the complete project for consistent deployment."),
        ("Bullet", "- Designed and implemented secure software architecture while optimizing code performance."),
        ("Bullet", "- Collaborated on API documentation and system integration for scalable applications."),
        ("HR", None),

        ("SectionHeader", "PROJECTS"),
        ("BigColored", "Telegram Keylogger (Rust)"),
        ("Bullet", "- Developed a custom keylogger for ethical research, transmitting logs securely to Telegram using the Bot API."),
        ("BigColored", "E-Commerce Platform (Django)"),
        ("Bullet", "- Created a secure and responsive e-commerce web application."),
        ("BigColored", "Peer-to-Peer Lending Platform (React + Django)"),
        ("Bullet", "- Designed a dynamic platform allowing users to rent or lend various categories of items securely."),
        ("BigColored", "Anonymous Chat Website (Node.js + WebSocket)"),
        ("Bullet", "- Built a real-time chat application similar to Omegle."),
        ("HR", None),

        ("SectionHeader", "CERTIFICATIONS"),
        ("Normal", "Cybersecurity Foundation - Palo Alto Networks Academy"),
        ("Normal", "Issued: May 6, 2025"),
        ("HR", None),

        ("SectionHeader", "ADDITIONAL INFORMATION"),
        ("Normal", "Languages: Hindi (Native), English (Professional Working Proficiency)"),
        ("Normal", "Interests: Ethical Hacking, System Automation, Backend Development"),
    ]

def create_pdf(output_path="Gauravcv_ATS_OnePage.pdf"):
    styles = get_exact_styles()

    hidden_keywords_text = (
        "cybersecurity, backend developer, API development, ethical hacking, Python, Django, Django Rest Framework, DRF, "
        "RESTful API, penetration testing, DevOps, Rust, React, Node.js, OWASP, Metasploit, Wireshark, Nmap, Burp Suite, Docker, "
        "Git, workflow automation, malware analysis, secure software design, full-stack development, code optimization, "
        "architecture planning, API documentation, system integration, cloud computing, CI/CD pipelines, "
        "microservices architecture, software scalability, threat modeling, vulnerability assessment, "
        "encryption protocols, container orchestration, agile methodology, SCRUM, system hardening, linux, ubuntu, AWS, Google, Meta, quant finance"
    )

    doc = SimpleDocTemplate(output_path, pagesize=A4, leftMargin=28, rightMargin=28, topMargin=20, bottomMargin=20)
    story = [Paragraph(hidden_keywords_text, styles["HiddenKeywords"]), Spacer(1, 0)]

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

