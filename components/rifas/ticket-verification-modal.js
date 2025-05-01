"use client";
import { useState } from "react";
import { verifyTickets } from "@/utils/ticketVerificationService";
import { Input } from "../ui/input";

export default function TicketVerificationModal({ isOpen, onClose, raffleId }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [verificationResult, setVerificationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const result = await verifyTickets(raffleId, formData);
            setVerificationResult(result);
        } catch (error) {
            setVerificationResult({
                success: false,
                message: "Error al verificar tickets: " + error.message,
                tickets: []
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-secondary-900 border border-secondary/10 rounded-xl p-6 max-w-md w-full shadow-[0_0_15px_rgba(0,191,255,0.15)]">
                <div className="relative">
                    <h2 className="text-2xl font-bold mb-4 text-white bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                        Verificar Tickets
                    </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Nombre
                        </label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700/50 text-white"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Correo Electrónico
                        </label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700/50 text-white"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Teléfono
                        </label>
                        <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="bg-gray-700/50 text-white"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-700/80 rounded-lg border border-gray-600 hover:bg-gray-600/80 transition-colors"
                        >
                            Cerrar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 text-sm font-medium text-[#222222] bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Verificando..." : "Verificar"}
                        </button>
                    </div>
                </form>

                {verificationResult && (
                    <div className="mt-6 border-t border-gray-700/50 pt-6">
                        <p className={`text-sm mb-4 ${verificationResult.success ? "text-primary" : "text-red-400"}`}>
                            {verificationResult.message}
                        </p>
                        {verificationResult.tickets.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">
                                    Tus tickets:
                                </h3>
                                <div className="space-y-4">
                                    {verificationResult.tickets.map((item, index) => (
                                        <div key={index} 
                                            className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl shadow-[0_0_10px_rgba(0,191,255,0.1)]"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="text-primary font-medium">
                                                    {item.raffleName || `Rifa ${item.raffleId}`}
                                                </h4>
                                                <span className="text-green-400 font-medium">
                                                    ${item.totalAmount}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {item.tickets.map((ticket, idx) => (
                                                    <span key={idx} 
                                                        className="px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-md text-sm text-white"
                                                    >
                                                        {ticket}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}
