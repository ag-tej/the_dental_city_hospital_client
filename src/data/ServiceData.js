import cosmeticDentistry from "../assets/cosmetic-dentistry.webp";
import digitalDentistry from "../assets/digital-dentistry.webp";
import endodontics from "../assets/endodontics.webp";
import oralAndMaxillofacial from "../assets/oral-and-maxillofacial.webp";
import oralMedicineAndRadiology from "../assets/oral-medicine-and-radiology.webp";
import orthodontics from "../assets/orthodontics.webp";
import pedodontics from "../assets/pedodontics.webp";
import periodontics from "../assets/periodontics.webp";
import preventiveDentistry from "../assets/preventive dentistry.webp";
import prosthodontics from "../assets/prosthodontics.webp";

export const serviceData = [
  {
    id: 1,
    name: "Oral Medicine & Radiology",
    description: [
      "All kind of soft and hard tissue diagnosis",
      "Medical treatment of oral diseases",
      "Treatment of temporomandibular joint disorders",
      "All kind of radiological diagnosis (X-Ray, CBCT, OPG etc.)",
    ],
    image: oralMedicineAndRadiology,
  },
  {
    id: 2,
    name: "Orthodontics",
    description: [
      "Metal braces",
      "Ceramic braces",
      "Self ligating braces",
      "Aligners",
      "Dento facial orthopedics",
      "Snoring & apnea management",
    ],
    image: orthodontics,
  },
  {
    id: 3,
    name: "Prosthodontics",
    description: [
      "Dental implants",
      "Crown and bridge",
      "Fixed teeth",
      "Removable teeth",
      "Implant supported dentures",
    ],
    image: prosthodontics,
  },
  {
    id: 4,
    name: "Endodontics",
    description: [
      "Tooth filling",
      "Root canal treatment",
      "Re - RCT",
      "Post and core",
      "Inlays and Onlays",
      "Internal bleaching of teeth",
    ],
    image: endodontics,
  },
  {
    id: 5,
    name: "Periodontics",
    description: [
      "Scaling and root planning",
      "Soft tissue grafts",
      "Bone grafts",
      "GTR ( Guided Tissue Regeneration)",
      "Crown Lengthening Surgery",
      "Gingivectomy and Gingivoplasty",
    ],
    image: periodontics,
  },
  {
    id: 6,
    name: "Oral & Maxillofacial Surgery",
    description: [
      "Wisdom tooth surgery",
      "Tooth extraction",
      "Minor dental surgery",
      "Facial fracture management",
      "Reconstructive facial surgery",
    ],
    image: oralAndMaxillofacial,
  },
  {
    id: 7,
    name: "Pedodontics (child dentistry)",
    description: [
      "Child tooth restoration",
      "Milk tooth extraction",
      "Tooth decay prevention",
      "Milk tooth root canal management",
      "Treatment of bad oral habits",
    ],
    image: pedodontics,
  },
  {
    id: 8,
    name: "Cosmetic Dentistry",
    description: [
      "Teeth whitening",
      "Veneers",
      "Reshaping teeth (Enameloplasty)",
      "Depigmentation of gums",
      "Gun contouring",
      "Dental Ornament (Diamond on tooth, golden crown etc.)",
    ],
    image: cosmeticDentistry,
  },
  {
    id: 9,
    name: "Preventive Dentistry",
    description: [
      "We adopt all kind of measures to prevent dental diseases and stop the progress of any condition that can cause future dental diseases.",
    ],
    image: preventiveDentistry,
  },
  {
    id: 10,
    name: "Digital Dentistry",
    description: [
      "Intra oral scanning",
      "Facial scanning",
      "Mockup preparations",
      "Aligners",
      "Digitally designed tooth restorations",
      "Digital Dental Consultation",
    ],
    image: digitalDentistry,
  },
];
