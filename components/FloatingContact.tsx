"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";

const PHONE = "+995555123456";
const WHATSAPP = "https://wa.me/995555123456";
const FACEBOOK = "https://facebook.com";

const easeOut = [0.22, 1, 0.36, 1] as const;

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 18.5 4 21V7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v8a2.5 2.5 0 0 1-2.5 2.5H7.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10h7M8.5 13.5h4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
      />
    </svg>
  );
}

type FloatingContactProps = {
  locale: Locale;
};

export default function FloatingContact({ locale }: FloatingContactProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dict = getDictionary(locale).floatingContact;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const actions = [
    {
      id: "whatsapp",
      href: WHATSAPP,
      label: dict.whatsapp,
      className: "bg-[#25D366] text-white hover:bg-[#1ebe57]",
      icon: <WhatsAppIcon className="size-6" />,
      external: true,
    },
    {
      id: "facebook",
      href: FACEBOOK,
      label: dict.facebook,
      className: "bg-[#1877F2] text-white hover:bg-[#166fe5]",
      icon: <FacebookIcon className="size-6" />,
      external: true,
    },
    {
      id: "phone",
      href: `tel:${PHONE}`,
      label: dict.phone,
      className: "bg-neutral-900 text-white hover:bg-neutral-800",
      icon: <PhoneIcon className="size-5" />,
      external: false,
    },
  ] as const;

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-[70] flex flex-col items-center gap-3 md:right-6 md:bottom-6"
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            className="flex flex-col items-center gap-3"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.07, staggerDirection: -1 },
              },
            }}
          >
            {actions.map((action) => (
              <motion.li
                key={action.id}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.85 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.35, ease: easeOut },
                  },
                }}
              >
                <a
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  aria-label={action.label}
                  className={`flex size-12 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors duration-300 ${action.className}`}
                >
                  {action.icon}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={open ? dict.close : dict.open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#9B8FA8] text-white shadow-[0_10px_30px_rgba(155,143,168,0.45)] transition-colors duration-300 hover:bg-[#8d819c]"
        whileTap={{ scale: 0.94 }}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          {open ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <ChatIcon className="size-7" />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}
