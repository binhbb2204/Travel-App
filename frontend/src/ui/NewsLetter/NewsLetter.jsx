import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '../Button';
import './news-letter.css'
const NewsLetter = () => {
    const[email, setEmail] = useState('')
    const[status, setStatus] = useState('');
    const [focused, setFocused] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!email){
            setStatus("Please enter your email address TvT");
            return;
        }
        try{
            setStatus("Thank you for subscribing <3");
            setEmail('');
        }
        catch(error){
            setStatus("Uh Oh something went wrong. Please try again. :(");
        }
    };
    return (
        <section className="newsletter-container py-20 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white">
            <div className="container mx-auto px-4">
                <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="text-center max-w-2xl mx-auto"
                >
                    <h2 className = "text-3xl md:text-4xl font-bold mb-3">
                        Get Travel Inspiration
                    </h2>
                    <p className="mb-6">
                        Subscribe to our newsletter for exclusive deals and travel tips
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className="px-6 py-2.5 rounded-3xl text-gray-800 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                            />
                            <button
                            type="submit"
                            className="px-8 py-2.5 rounded-3xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
                            >
                                Subscribe
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        {status && (
                            <motion.p
                            initial = {{opacity: 0}}
                            animate = {{opacity: 1}}
                            className={`text-sm mt-2 
                                ${status === 'Thank you for subscribing! :D' ? 'text-red-700' : 'text-green-700'}`}

                            >
                                {status}
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>

    )
}

export default NewsLetter