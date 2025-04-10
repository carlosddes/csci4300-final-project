

export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 items-start gap-3 p-5 rounded-xl border border-[#ECEFF2] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
            {children}
        </div>
    );
};