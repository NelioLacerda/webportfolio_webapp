import React, { useMemo } from "react";

const formatDate = (isoOrDate) => {
    if (!isoOrDate) return null;
    const d = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
    if (isNaN(d)) return null;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const BlogCard = ({
                      title,
                      excerpt,
                      date,
                      readTime,
                      tags = [],
                      cover,
                      imageAlt,
                      onClick,
                      href,
                      ctaLabel = "Read More →",
                  }) => {
    const formatted = useMemo(() => formatDate(date), [date]);

    const Cta = href
        ? (props) => (
            <a
                {...props}
                href={href}
                className={`btn hover-animation w-full ${props.className || ""}`}
                aria-label={`Abrir post ${title}`}
            />
        )
        : (props) => (
            <button
                {...props}
                onClick={onClick}
                className={`btn hover-animation w-full ${props.className || ""}`}
                aria-label={`Abrir post ${title}`}
            />
        );

    return (
        <div className="group overflow-hidden rounded-2xl bg-gradient-to-b from-storm to-indigo hover:-translate-y-1 duration-200 border border-white/5">
            <article className="flex h-full flex-col">
                <div className="aspect-[16/9] overflow-hidden">
                    <img
                        src={cover}
                        alt={imageAlt || `Capa do post: ${title}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>

                <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                        {formatted && <time dateTime={typeof date === "string" ? date : undefined}>{formatted}</time>}
                        {(formatted && readTime) && <span aria-hidden="true">•</span>}
                        {readTime && <span>{readTime}</span>}
                    </div>

                    <h3 className="text-lg font-semibold">{title}</h3>
                    {excerpt && <p className="subtext">{excerpt}</p>}

                    {tags?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.map((t) => (
                                <span
                                    key={t}
                                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-neutral-300 border border-white/10"
                                >
                  {t}
                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-4">
                        <Cta>{ctaLabel}</Cta>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogCard;