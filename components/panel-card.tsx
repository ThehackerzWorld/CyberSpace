"use client";

import { motion } from "motion/react";

type PanelCardProps = {
  title: string;
  kicker?: string;
  children: React.ReactNode;
};

export function PanelCard({ title, kicker, children }: PanelCardProps) {
  return (
    <motion.section
      className="panelCard"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {kicker ? <p className="eyebrow">{kicker}</p> : null}
      <h2>{title}</h2>
      <div className="panelContent">{children}</div>
    </motion.section>
  );
}
