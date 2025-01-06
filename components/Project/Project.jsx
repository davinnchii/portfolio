'use client';
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import './Project.css'
export const Project = ({ project }) => {
    const { image, title, description, note, demoUrl, githubUrl } = project;
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);

    const openPreview = () => setIsPreviewOpen(true);

    const closePreview = () => {
        setIsPreviewOpen(false);
    };

    // Close preview when clicking outside of modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && (modalContentRef.current && !modalContentRef.current.contains(event.target))) {
                closePreview();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="max-w-md overflow-hidden shadow-lg bg-white rounded-2xl border border-custom-blue-light shadow-custom-blue-light p-4">
            <div
                className="relative group overflow-hidden rounded-xl border-custom-blue-light cursor-pointer"
                onClick={openPreview}
            >
                <img
                    className="w-full h-full object-cover object-center  rounded-xl transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={image}
                    alt="Domposer Pqwereview"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
            </div>
            <div className="px-4">
                <h3 className="text-xl text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                   {description}
                </p>
                <p className="text-gray-600 text-sm">
                    {note || ''}
                </p>
                <div className="flex gap-2 items-center justify-center">
                    <a
                        href={demoUrl}
                        className="inline-block mt-4 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
                    >
                        🌐 Visit Project
                    </a>
                    <a
                        href={githubUrl}
                        className="inline-block mt-4 px-3 py-2 bg-gray-400 text-white text-sm font-medium rounded hover:bg-gray-500 transition"
                    >
                        See code
                    </a>
                </div>
            </div>
            <CSSTransition
                in={isPreviewOpen}
                timeout={300}
                classNames="fade"
                mountOnEnter
                unmountOnExit
                nodeRef={modalRef}
            >
                <div
                    className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${!isPreviewOpen ? "opacity-0" : "opacity-100"
                        }`}
                    ref={modalRef}
                >
                    {/* Modal content */}
                    <div
                        className={`relative w-[80%] h-[80%] mx-auto mt-12 bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${!isPreviewOpen ? "scale-95 opacity-0" : "scale-100 opacity-100"
                            }`}
                        ref={modalContentRef}
                    >
                        <img
                            src={image}
                            alt="Domposer Full Preview"
                            className="w-full h-full object-cover object-center rounded-2xl"
                        />
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                            onClick={closePreview}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};