import type { TemplateContext } from './templateDataBuilder';

type TemplateData = Partial<TemplateContext> & Record<string, unknown>;

const esc = (str: unknown = "") => String(str)
  .replace(/&/g, "&amp;")
  .replace(/</g, "<")
  .replace(/>/g, ">");

const normalizeLines = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(v => String(v));
  if (typeof value === 'string') return value.split("\n");
  return [];
};

const bulletsToHtml = (value: unknown) =>
  normalizeLines(value)
    .filter(b => b.trim())
    .map(b => `<li style="margin-bottom:3px;">${esc(b.trim())}</li>`)
    .join("");

const skillsList = (text = "") =>
  String(text)
    .split(/[,\n]/)
    .filter(s => s.trim())
    .map(s => `<li style="margin-bottom:4px;">${esc(s.trim())}</li>`)
    .join("");

// TEMPLATE 1 — "Executive Split"
export function renderTemplate1(d: TemplateData): string {
  const exp = (d.experience || []).map((e: any) => `
    <div style="margin-bottom:16px; position:relative; padding-left:16px;">
      <div style="position:absolute; left:0; top:5px; width:8px; height:8px; background:#333;"></div>
      <div style="font-size:11px; font-weight:700; color:#333; letter-spacing:0.5px;">
        ${esc(e.startDate)}${e.endDate ? ` - ${esc(e.endDate).toUpperCase()}` : ""}
      </div>
      <div style="font-size:10.5px; color:#666; margin-bottom:2px;">${esc(e.company)}</div>
      <div style="font-weight:700; font-size:11.5px; margin-bottom:4px;">${esc(e.role)}</div>
      ${e.bullets ? `<ul style="margin:0; padding-left:14px; font-size:10.5px; color:#333; line-height:1.6;">${bulletsToHtml(e.bullets)}</ul>` : ""}
    </div>`).join("");

  const edu = (d.education || []).map((e: any) => `
    <div style="margin-bottom:12px;">
      <div style="font-size:10.5px; font-weight:700; color:#333;">
        ${esc(e.startDate)}${e.endDate ? ` - ${esc(e.endDate)}` : ""}
      </div>
      <div style="font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.3px;">${esc(e.school)}</div>
      <ul style="margin:3px 0 0; padding-left:14px; font-size:10.5px; line-height:1.6;">
        <li>${esc(e.diploma)}${e.degree ? ` of ${esc(e.degree)}` : ""}</li>
        ${e.grade ? `<li>GPA: ${esc(e.grade)}</li>` : ""}
      </ul>
    </div>`).join("");

  const langs = (d.languages || []).map((l: any) =>
    `<li style="margin-bottom:3px;">${esc(l.name)}${l.level ? ` (${esc(l.level)})` : ""}</li>`
  ).join("");

  const sectionHead = (title: string) =>
    `<div style="font-size:11px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:#222; margin-bottom:6px; padding-bottom:4px; border-bottom:1.5px solid #ccc;">${title}</div>`;

  return `
    <div style="font-family:'Times New Roman', Georgia, serif; font-size:11px; color:#222; background:#fff; width:210mm; min-height:297mm; box-sizing:border-box;">
      <div style="display:flex; padding:28px 28px 20px; border-bottom:1.5px solid #ddd;">
        <div style="flex:1; padding-right:24px; border-right:1.5px solid #ddd;">
          <div style="font-size:28px; font-weight:700; line-height:1.1; letter-spacing:1px; text-transform:uppercase;">${esc((d as any).name || "Your Name")}</div>
          <div style="font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#666; margin-top:6px;">${esc((d as any).address || "")}</div>
        </div>
        <div style="width:200px; padding-left:24px; font-size:10.5px; line-height:2;">
          ${(d as any).phone ? `<div>📞 ${esc((d as any).phone)}</div>` : ""}
          ${(d as any).email ? `<div>✉ ${esc((d as any).email)}</div>` : ""}
          ${(d as any).address ? `<div>📍 ${esc((d as any).address)}</div>` : ""}
          ${(d as any).linkedin ? `<div>🌐 ${esc((d as any).linkedin)}</div>` : ""}
          ${(d as any).github ? `<div>🔗 ${esc((d as any).github)}</div>` : ""}
        </div>
      </div>

      <div style="display:flex; padding:0 28px 28px;">
        <div style="flex:1; padding-right:24px; border-right:1.5px solid #ddd; padding-top:20px;">
          ${(d as any).summary ? `
            <div style="margin-bottom:20px;">
              ${sectionHead("Profile")}
              <p style="font-size:10.5px; line-height:1.7; margin:0;">${esc((d as any).summary)}</p>
            </div>` : ""}

          ${exp ? `
            <div style="margin-bottom:20px;">
              ${sectionHead("Work Experience")}
              ${exp}
            </div>` : ""}

          ${(d as any).projects?.length ? `
            <div style="margin-bottom:20px;">
              ${sectionHead("Projects")}
              ${((d as any).projects as any[]).map(p => `
                <div style="margin-bottom:10px;">
                  <div style="font-weight:700; font-size:11px;">${esc(p.name)}${p.tech ? `<span style="font-weight:400; color:#666;"> · ${esc(p.tech)}</span>` : ""}</div>
                  ${p.description ? `<p style="font-size:10.5px; margin:3px 0 0; line-height:1.6;">${esc(p.description)}</p>` : ""}
                </div>`).join("")}
            </div>` : ""}
        </div>

        <div style="width:200px; padding-left:24px; padding-top:20px;">
          {${edu ? `
            <div style="margin-bottom:20px;">
              ${sectionHead("Education")}
              ${edu}
            </div>` : ""}}

          ${(d as any).skills ? `
            <div style="margin-bottom:20px;">
              ${sectionHead("Skills")}
              <ul style="margin:0; padding-left:14px; font-size:10.5px; line-height:1.8;">${skillsList((d as any).skills)}</ul>
            </div>` : ""}

          ${(langs) ? `
            <div style="margin-bottom:20px;">
              ${sectionHead("Languages")}
              <ul style="margin:0; padding-left:14px; font-size:10.5px; line-height:1.8;">${langs}</ul>
            </div>` : ""}

          ${(d as any).certifications?.length ? `
            <div style="margin-bottom:20px;">
              ${sectionHead("Certifications")}
              ${((d as any).certifications as any[]).map(c => `
                <div style="margin-bottom:6px; font-size:10.5px;">
                  <div style="font-weight:700;">${esc(c.name)}</div>
                  <div style="color:#666;">${esc(c.issuer)}${c.year ? ` · ${esc(c.year)}` : ""}</div>
                </div>`).join("")}
            </div>` : ""}
        </div>
      </div>
    </div>`;
}

// TEMPLATE 2
export function renderTemplate2(d: TemplateData): string {
  const timelineExp = (d.experience || []).map((e: any) => `
    <div style="display:flex; margin-bottom:16px; position:relative;">
      <div style="position:absolute; left:-20px; top:4px; width:10px; height:10px; border-radius:50%; background:#1a2a3a; border:2px solid #1a2a3a;"></div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <div style="font-weight:700; font-size:11.5px;">${esc(e.company)}</div>
          <div style="font-size:10px; color:#666;">${esc(e.startDate)}${e.endDate ? ` - ${esc(e.endDate).toUpperCase()}` : ""}</div>
        </div>
        <div style="font-size:10.5px; color:#555; margin-bottom:4px;">${esc(e.role)}</div>
        ${e.bullets ? `<ul style="margin:0; padding-left:14px; font-size:10px; line-height:1.7; color:#333;">${bulletsToHtml(e.bullets)}</ul>` : ""}
      </div>
    </div>`).join("");

  const timelineEdu = (d.education || []).map((e: any) => `
    <div style="display:flex; margin-bottom:12px; position:relative;">
      <div style="position:absolute; left:-20px; top:4px; width:10px; height:10px; border-radius:50%; background:#1a2a3a; border:2px solid #1a2a3a;"></div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between;">
          <div style="font-weight:700; font-size:11px;">${esc(e.diploma)} ${esc(e.degree)}</div>
          <div style="font-size:10px; color:#666;">${esc(e.startDate)}${e.endDate ? ` - ${esc(e.endDate)}` : ""}</div>
        </div>
        <div style="font-size:10.5px; color:#666;">${esc(e.school)}</div>
        ${e.grade ? `<div style="font-size:10px; color:#888;">GPA: ${esc(e.grade)}</div>` : ""}
      </div>
    </div>`).join("");

  const sectionHead = (title: string) =>
    `<div style="font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#1a2a3a; margin-bottom:8px; padding-bottom:4px; border-bottom:1.5px solid #1a2a3a;">${title}</div>`;

  const sideHead = (title: string) =>
    `<div style="font-size:10.5px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#1a2a3a; margin-bottom:6px; padding-bottom:3px; border-bottom:1px solid #555;">${title}</div>`;

  return `
    <div style="font-family:'Helvetica Neue', Arial, sans-serif; font-size:11px; color:#222; background:#fff; width:210mm; min-height:297mm; box-sizing:border-box;">
      <div style="background:#1a2a3a; padding:22px 28px 16px; color:#fff;">
        <div style="font-size:26px; font-weight:900; letter-spacing:1px; text-transform:uppercase;">${esc((d as any).name || "Your Name")}</div>
        <div style="font-size:11px; letter-spacing:1.5px; color:#aab8c6; margin-top:4px; text-transform:uppercase;">${esc((d as any).address || "")}</div>
        <div style="border-bottom:1.5px solid #aab8c6; margin-top:12px;"></div>
      </div>
      <div style="display:flex;">
        <div style="width:175px; background:#f7f8fa; padding:20px 16px; border-right:1px solid #e0e0e0;">
          <div style="margin-bottom:18px;">
            ${sideHead("Contact")}
            ${(d as any).phone ? `<div style="font-size:10px; margin-bottom:5px; display:flex; align-items:center; gap:5px;">📞 ${esc((d as any).phone)}</div>` : ""}
            ${(d as any).email ? `<div style="font-size:10px; margin-bottom:5px; display:flex; align-items:center; gap:5px;">✉ ${esc((d as any).email)}</div>` : ""}
            ${(d as any).address ? `<div style="font-size:10px; margin-bottom:5px; display:flex; align-items:center; gap:5px;">📍 ${esc((d as any).address)}</div>` : ""}
            ${(d as any).linkedin ? `<div style="font-size:10px; margin-bottom:5px; word-break:break-all;">🌐 ${esc((d as any).linkedin)}</div>` : ""}
            ${(d as any).github ? `<div style="font-size:10px; margin-bottom:5px; word-break:break-all;">🔗 ${esc((d as any).github)}</div>` : ""}
          </div>

          ${(d as any).skills ? `
            <div style="margin-bottom:18px;">
              ${sideHead("Skills")}
              <ul style="margin:0; padding-left:13px; font-size:10px; line-height:1.9;">${skillsList((d as any).skills)}</ul>
            </div>` : ""}

          ${((d as any).languages || []).length ? `
            <div style="margin-bottom:18px;">
              ${sideHead("Languages")}
              <ul style="margin:0; padding-left:13px; font-size:10px; line-height:1.9;">
                ${((d as any).languages as any[]).map(l => `<li>${esc(l.name)}${l.level ? ` (${esc(l.level)})` : ""}</li>`).join("")}
              </ul>
            </div>` : ""}

          ${((d as any).certifications || []).length ? `
            <div style="margin-bottom:18px;">
              ${sideHead("Certifications")}
              ${((d as any).certifications as any[]).map(c => `
                <div style="font-size:10px; margin-bottom:6px;">
                  <div style="font-weight:600;">${esc(c.name)}</div>
                  <div style="color:#666;">${esc(c.issuer)}${c.year ? `, ${esc(c.year)}` : ""}</div>
                </div>`).join("")}
            </div>` : ""}
        </div>

        <div style="flex:1; padding:20px 24px 20px 28px;">
          ${(d as any).summary ? `
            <div style="margin-bottom:18px;">
              ${sectionHead("Profile")}
              <p style="font-size:10.5px; line-height:1.7; margin:0; font-style:italic; color:#333;">"${esc((d as any).summary)}"</p>
            </div>` : ""}

          ${timelineExp ? `
            <div style="margin-bottom:18px;">
              ${sectionHead("Work Experience")}
              <div style="margin-left:20px; border-left:2px solid #1a2a3a; padding-left:16px;">
                ${timelineExp}
              </div>
            </div>` : ""}

          ${((d as any).projects || []).length ? `
            <div style="margin-bottom:18px;">
              ${sectionHead("Projects")}
              ${((d as any).projects as any[]).map(p => `
                <div style="margin-bottom:10px;">
                  <div style="font-weight:700; font-size:11px;">${esc(p.name)}${p.tech ? `<span style="font-weight:400; color:#666;"> · ${esc(p.tech)}</span>` : ""}</div>
                  ${p.description ? `<p style="font-size:10px; margin:3px 0 0; line-height:1.6;">${esc(p.description)}</p>` : ""}
                </div>`).join("")}
            </div>` : ""}

          ${timelineEdu ? `
            <div style="margin-bottom:18px;">
              ${sectionHead("Education")}
              <div style="margin-left:20px; border-left:2px solid #1a2a3a; padding-left:16px;">
                ${timelineEdu}
              </div>
            </div>` : ""}
        </div>
      </div>
    </div>`;
}

// TEMPLATE 3
export function renderTemplate3(d: TemplateData): string {
  const sectionHead = (title: string) => `
    <div style="background:#e8eaec; padding:5px 10px; margin-bottom:10px;">
      <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#1a1a1a;">${title}</span>
    </div>`;

  const expItems = (d.experience || []).map((e: any) => {
    const lines = normalizeLines(e.bullets);
    const bulletsHtml = lines.length
      ? `<ul style="margin:4px 0 0; padding-left:16px; font-size:10.5px; line-height:1.7;">${lines.filter(Boolean).map(b => `<li style="margin-bottom:3px;">${esc(b)}</li>`).join("")}</ul>`
      : "";

    return `
      <div style="margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:baseline;">
          <div style="font-weight:700; font-size:11.5px;">${esc(e.role)}, ${esc(e.company)}</div>
          <div style="font-size:10.5px; color:#555;">${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ""}</div>
        </div>
        ${bulletsHtml}
      </div>`;
  }).join("");

  const eduItems = (d.education || []).map((e: any) => `
    <div style="margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:baseline;">
        <div style="font-weight:700; font-size:11.5px;">${esc(e.diploma)} ${esc(e.degree)}</div>
        <div style="font-size:10.5px; color:#555;">${esc(e.startDate)}${e.endDate ? ` – ${esc(e.endDate)}` : ""}</div>
      </div>
      <div style="font-size:10.5px; color:#555;">${esc(e.school)}</div>
      ${e.grade ? `<ul style="margin:3px 0 0; padding-left:16px; font-size:10.5px;"><li>Final CGPA: ${esc(e.grade)}</li></ul>` : ""}
    </div>`).join("");

  const skillItems = (d as any).skills
    ? skillsList((d as any).skills)
    : "";

  const langs = (d as any).languages?.length
    ? (d as any).languages.map((l: any) => `${esc(l.name)}${l.level ? ` (${esc(l.level)})` : ""}`).join(" · ")
    : "";

  return `
    <div style="font-family:'Helvetica Neue', Arial, sans-serif; font-size:11px; color:#1a1a1a; background:#fff; width:210mm; min-height:297mm; box-sizing:border-box; padding:28px 32px;">
      <div style="text-align:center; margin-bottom:6px;">
        <div style="font-size:26px; font-weight:900; text-transform:uppercase; letter-spacing:1px;">${esc((d as any).name || "Your Name")}</div>
        <div style="font-size:11px; color:#555; margin-top:2px;">${esc((d as any).address || "")}</div>
      </div>
      <div style="text-align:center; font-size:10.5px; color:#555; margin-bottom:6px; border-top:1.5px solid #ccc; border-bottom:1.5px solid #ccc; padding:5px 0;">
        ${[((d as any).email), (d as any).phone, (d as any).address].filter(Boolean).map(esc).join(" | ")}
        ${(d as any).linkedin ? ` | ${esc((d as any).linkedin)}` : ""}
        ${(d as any).github ? ` | ${esc((d as any).github)}` : ""}
      </div>

      ${(d as any).summary ? `
        <div style="margin-bottom:14px;">
          ${sectionHead("Summary")}
          <p style="font-size:10.5px; line-height:1.7; margin:0; text-align:justify;">${esc((d as any).summary)}</p>
        </div>` : ""}

      ${expItems ? `
        <div style="margin-bottom:14px;">
          ${sectionHead("Work Experience")}
          ${expItems}
        </div>` : ""}

      ${((d as any).projects || []).length ? `
        <div style="margin-bottom:14px;">
          ${sectionHead("Projects")}
          ${((d as any).projects as any[]).map((p: any) => `
            <div style="margin-bottom:10px;">
              <div style="font-weight:700; font-size:11px;">${esc(p.name)}${p.tech ? ` <span style="font-weight:400; color:#666;">· ${esc(p.tech)}</span>` : ""}</div>
              ${p.description ? `<p style="font-size:10.5px; margin:3px 0 0; line-height:1.6;">${esc(p.description)}</p>` : ""}
            </div>`).join("")}
        </div>` : ""}

      ${eduItems ? `
        <div style="margin-bottom:14px;">
          ${sectionHead("Education")}
          ${eduItems}
        </div>` : ""}

      ${skillItems ? `
        <div style="margin-bottom:14px;">
          ${sectionHead("Key Skills")}
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0 8px;">${skillItems}</div>
        </div>` : ""}

      ${langs ? `
        <div style="margin-bottom:14px;">
          ${sectionHead("Languages")}
          <p style="margin:0; font-size:10.5px;">${langs}</p>
        </div>` : ""}

      ${((d as any).certifications || []).length ? `
        <div style="margin-bottom:14px;">
          ${sectionHead("Certifications")}
          ${((d as any).certifications as any[]).map((c: any) => `
            <div style="margin-bottom:5px; font-size:10.5px;">
              <strong>${esc(c.name)}</strong>${c.issuer ? ` · ${esc(c.issuer)}` : ""}${c.year ? ` (${esc(c.year)})` : ""}
            </div>`).join("")}
        </div>` : ""}
    </div>`;
}

// TEMPLATE 4 — Dark Sidebar
export function renderTemplate4(d: TemplateData): string {
  const sideSection = (title: string) =>
    `<div style="font-size:13px; font-weight:700; color:#fff; margin-bottom:8px; margin-top:16px; padding-bottom:4px; border-bottom:1px solid rgba(255,255,255,0.25);">${title}</div>`;

  const mainSection = (title: string) =>
    `<div style="font-size:13px; font-weight:700; color:#1a2a3a; margin-bottom:8px; padding-bottom:4px; border-bottom:1.5px solid #1a2a3a;">${title}</div>`;

  const expItems = (d.experience || []).map((e: any) => {
    const bulletLines = normalizeLines(e.bullets);
    const bulletHtml = bulletLines.length
      ? `<p style="font-size:10.5px; margin:0; line-height:1.7; color:#333;">${esc(bulletLines.filter(Boolean).join(" "))}</p>`
      : "";

    return `
      <div style="display:flex; margin-bottom:18px; position:relative;">
        <div style="position:absolute; left:-22px; top:4px; width:10px; height:10px; border-radius:50%; border:2px solid #1a2a3a; background:#fff;"></div>
        <div style="flex:1;">
          <div style="font-size:10.5px; color:#666; margin-bottom:1px;">${esc(e.startDate)}${e.endDate ? ` - ${esc(e.endDate)}` : ""}</div>
          <div style="font-size:10.5px; color:#666; margin-bottom:2px;">${esc(e.company)}</div>
          <div style="font-weight:700; font-size:11.5px; margin-bottom:4px;">${esc(e.role)}</div>
          ${bulletHtml}
        </div>
      </div>`;
  }).join("");

  const sideEdu = (d.education || []).map((e: any) => `
    <div style="margin-bottom:10px;">
      <div style="font-size:9.5px; color:#aab8c6;">${esc(e.startDate)}${e.endDate ? ` - ${esc(e.endDate)}` : ""}</div>
      <div style="font-weight:700; font-size:10.5px; color:#fff;">${esc(e.diploma)} ${esc(e.degree)}</div>
      <div style="font-size:10px; color:#aab8c6;">${esc(e.school)}</div>
    </div>`).join("");

  return `
    <div style="font-family:'Georgia', serif; font-size:11px; color:#222; background:#fff; width:210mm; min-height:297mm; box-sizing:border-box; display:flex;">
      <div style="width:185px; background:#1a2a3a; padding:24px 16px; color:#fff; flex-shrink:0;">
        <div style="margin-bottom:6px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.2);">
          <div style="font-size:11px; font-weight:700; color:#aab8c6; letter-spacing:1px; text-transform:uppercase; margin-bottom:16px;">Contact</div>
          ${(d as any).phone ? `<div style="margin-bottom:8px;"><div style="font-size:9.5px; font-weight:600; color:#aab8c6; text-transform:uppercase; letter-spacing:0.5px;">Phone</div><div style="font-size:10px; color:#fff;">${esc((d as any).phone)}</div></div>` : ""}
          ${(d as any).email ? `<div style="margin-bottom:8px;"><div style="font-size:9.5px; font-weight:600; color:#aab8c6; text-transform:uppercase; letter-spacing:0.5px;">Email</div><div style="font-size:10px; color:#fff; word-break:break-all;">${esc((d as any).email)}</div></div>` : ""}
          ${(d as any).address ? `<div style="margin-bottom:8px;"><div style="font-size:9.5px; font-weight:600; color:#aab8c6; text-transform:uppercase; letter-spacing:0.5px;">Address</div><div style="font-size:10px; color:#fff;">${esc((d as any).address)}</div></div>` : ""}
          ${(d as any).linkedin ? `<div style="margin-bottom:8px;"><div style="font-size:9.5px; font-weight:600; color:#aab8c6; text-transform:uppercase; letter-spacing:0.5px;">LinkedIn</div><div style="font-size:10px; color:#fff; word-break:break-all;">${esc((d as any).linkedin)}</div></div>` : ""}
        </div>

        ${sideEdu ? `
          <div>
            ${sideSection("Education")}
            ${sideEdu}
          </div>` : ""}

        ${(d as any).skills ? `
          <div>
            ${sideSection("Expertise")}
            <ul style="margin:0; padding-left:13px; font-size:10px; line-height:1.9; color:#dce6f0;">${skillsList((d as any).skills)}</ul>
          </div>` : ""}

        {${((d as any).languages || []).length ? `
          <div>
            ${sideSection("Language")}
            ${((d as any).languages as any[]).map((l: any) => `
              <div style="font-size:10.5px; color:#fff; margin-bottom:4px;">${esc(l.name)}${l.level ? `<span style="color:#aab8c6; font-size:9.5px;"> · ${esc(l.level)}</span>` : ""}</div>
            `).join("")}
          </div>` : ""}}

        ${(((d as any).certifications || []) as any[]).length ? `
          <div>
            ${sideSection("Certifications")}
            ${((d as any).certifications as any[]).map((c: any) => `
              <div style="margin-bottom:6px;">
                <div style="font-size:10.5px; font-weight:600; color:#fff;">${esc(c.name)}</div>
                <div style="font-size:9.5px; color:#aab8c6;">${esc(c.issuer)}${c.year ? ` · ${esc(c.year)}` : ""}</div>
              </div>`).join("")}
          </div>` : ""}
      </div>

      <div style="flex:1; padding:28px 24px;">
        <div style="margin-bottom:20px;">
          <div style="font-size:26px; font-weight:700; font-family:Georgia, serif; color:#1a2a3a;">${esc((d as any).name || "Your Name")}</div>
          <div style="font-size:12px; font-family:Georgia, serif; color:#666; margin-top:2px; letter-spacing:0.5px;">${esc((d as any).address || "")}</div>
          ${(d as any).summary ? `<p style="font-size:10.5px; margin:10px 0 0; line-height:1.7; color:#444;">${esc((d as any).summary)}</p>` : ""}
        </div>

        ${expItems ? `
          <div style="margin-bottom:20px;">
            ${mainSection("Experience")}
            <div style="margin-left:22px; border-left:2px solid #1a2a3a; padding-left:18px;">${expItems}</div>
          </div>` : ""}

        ${(((d as any).projects || []) as any[]).length ? `
          <div style="margin-bottom:20px;">
            ${mainSection("Projects")}
            ${((d as any).projects as any[]).map((p: any) => `
              <div style="margin-bottom:10px;">
                <div style="font-weight:700; font-size:11px; color:#1a2a3a;">${esc(p.name)}${p.tech ? `<span style="font-weight:400; color:#666; font-size:10.5px;"> · ${esc(p.tech)}</span>` : ""}</div>
                ${p.description ? `<p style="font-size:10.5px; margin:3px 0 0; line-height:1.6;">${esc(p.description)}</p>` : ""}
                ${p.link ? `<div style="font-size:10px; color:#1a2a3a;">${esc(p.link)}</div>` : ""}
              </div>`).join("")}
          </div>` : ""}
      </div>
    </div>`;
}

export function renderTemplate(templateId: string, data: TemplateData): string {
  switch (templateId) {
    case 'template2': return renderTemplate2(data);
    case 'template3': return renderTemplate3(data);
    case 'template4': return renderTemplate4(data);
    case 'template1':
    default:
      return renderTemplate1(data);
  }
}

