import React, { useState } from "react";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ld1azse",
        "template_rp01wc5",
        e.target as HTMLFormElement,
        "3T4kw0p6ndOYvtYBv"
      )
      .then(
        () => {
          toast.success("Mensagem enviada com sucesso!", {
            style: {
              border: "1px solid #086964",
              padding: "12px 16px",
              color: "#086964",
            },
            iconTheme: {
              primary: "#086964",
              secondary: "#ffffff",
            },
          });
        },
        () => {
          toast.error("Erro ao enviar a mensagem. Tente novamente.", {
            style: {
              border: "1px solid #e53e3e",
              padding: "12px 16px",
              color: "#e53e3e",
            },
            iconTheme: {
              primary: "#e53e3e",
              secondary: "#ffffff",
            },
          });
        }
      )
      .finally(() => {
        setLoading(false);
        e.currentTarget.reset();
      });
  };

  return (
    <motion.div
      className="bg-[#f8f9fa] min-h-screen py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster />
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-[#086964] mb-12">
          Entre em Contato
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Formulário */}
          <div className="lg:w-2/3 bg-white p-8 rounded-2xl shadow-2xl">
            <form onSubmit={sendEmail} className="space-y-6">
              <InputField label="Nome" name="name" type="text" required />
              <InputField label="E-mail" name="email" type="email" required />
              <InputField label="Assunto" name="title" type="text" />
              <TextAreaField label="Mensagem" name="message" required />

              <input
                type="hidden"
                name="time"
                value={new Date().toLocaleString("pt-BR")}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  loading
                    ? "bg-[#4ca6a2] cursor-not-allowed"
                    : "bg-[#086964] hover:bg-[#0b8079]"
                } text-white shadow-md`}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>

          {/* Informações + Mapa */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-[#086964] mb-6">
                Informações de Contato
              </h2>

              <InfoItem
                icon={<MapPinIcon size={24} className="text-[#086964]" />}
                title="Endereço"
                content={
                  <>
                    Av. Francisco Alves Moreira, 355
                    <br />
                    Vila Santos, Caçapava - SP
                    <br />
                    CEP: 12280-011
                  </>
                }
              />
              <InfoItem
                icon={<PhoneIcon size={24} className="text-[#086964]" />}
                title="Telefone"
                content="(12) 3653-7242"
              />
              <InfoItem
                icon={<MailIcon size={24} className="text-[#086964]" />}
                title="E-mail"
                content="atendimento@tayadaviagens.com"
              />
              <InfoItem
                icon={<ClockIcon size={24} className="text-[#086964]" />}
                title="Horário de Funcionamento"
                content={
                  <>
                    Segunda a Sexta: 09h às 18h
                    <br />
                    Sábado: 09h às 13h
                    <br />
                    Domingo: Fechado
                  </>
                }
              />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-[#086964] mb-4">
                Nossa Localização
              </h2>
              <div className="aspect-video overflow-hidden rounded-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.5290172881474!2d-45.71479252400369!3d-23.610645878780584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cdcbdb45f3b1b5%3A0xf9a3b34240b03a96!2sAv.%20Francisco%20Alves%20Moreira%2C%20355%20-%20Vila%20Santos%2C%20Ca%C3%A7apava%20-%20SP%2C%2012280-011!5e0!3m2!1spt-BR!2sbr!4v1713967462236!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Mapa da localização"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InputField = ({
  label,
  name,
  type,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-[#4ca6a2]"
    />
  </div>
);

const TextAreaField = ({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={name} className="block font-medium text-gray-700">
      {label}
    </label>
    <textarea
      name={name}
      rows={5}
      required={required}
      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-[#4ca6a2]"
    ></textarea>
  </div>
);

const InfoItem = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <div className="flex items-start gap-4 mb-4">
    {icon}
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

export default Contact;
