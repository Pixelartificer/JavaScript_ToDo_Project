// টাইপিং ইফেক্ট ক্লাস
class TypewriterEffect {
    constructor() {
        // DOM এলিমেন্ট
        this.textElement = document.getElementById('typewriter-text');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.speedRange = document.getElementById('speedRange');
        this.speedValue = document.getElementById('speedValue');
        
        // টাইপিং টেক্সট অ্যারে
        this.texts = [
            "আমি একজন ওয়েব ডেভেলপার",
            "আমি সুন্দর ওয়েবসাইট তৈরি করি",
            "টাইপিং ইফেক্ট খুব সুন্দর",
            "এটি একটি ইন্টারেক্টিভ প্রজেক্ট",
            "আপনিও এটি তৈরি করতে পারেন"
        ];
        
        // ভ্যারিয়েবল
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.isTyping = false;
        this.speed = 100;
        this.timeoutId = null;
        
        // ইভেন্ট লিসেনার যোগ করুন
        this.addEventListeners();
        
        // প্রাথমিক টাইপিং শুরু
        this.startTyping();
    }
    
    // ইভেন্ট লিসেনার যোগ করুন
    addEventListeners() {
        this.startBtn.addEventListener('click', () => this.startTyping());
        this.pauseBtn.addEventListener('click', () => this.pauseTyping());
        this.resetBtn.addEventListener('click', () => this.resetTyping());
        this.speedRange.addEventListener('input', (e) => this.updateSpeed(e));
    }
    
    // টাইপিং শুরু করুন
    startTyping() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.isPaused = false;
            this.type();
        } else if (this.isPaused) {
            this.isPaused = false;
            this.type();
        }
    }
    
    // টাইপিং বিরতি দিন
    pauseTyping() {
        this.isPaused = true;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    
    // টাইপিং রিসেট করুন
    resetTyping() {
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.isTyping = false;
        this.textElement.textContent = '';
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.startTyping();
    }
    
    // গতি আপডেট করুন
    updateSpeed(e) {
        this.speed = parseInt(e.target.value);
        this.speedValue.textContent = this.speed;
    }
    
    // মূল টাইপিং ফাংশন
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isPaused) return;
        
        if (!this.isDeleting) {
            // টাইপিং মোড
            if (this.currentCharIndex < currentText.length) {
                this.textElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
                this.timeoutId = setTimeout(() => this.type(), this.speed);
            } else {
                // টাইপিং সম্পন্ন, মুহূর্ত অপেক্ষা করুন
                this.isDeleting = true;
                this.timeoutId = setTimeout(() => this.type(), 2000);
            }
        } else {
            // মুছে ফেলার মোড
            if (this.currentCharIndex > 0) {
                this.textElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
                this.timeoutId = setTimeout(() => this.type(), this.speed / 2);
            } else {
                // মুছে ফেলা সম্পন্ন, পরবর্তী টেক্সটে যান
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                this.timeoutId = setTimeout(() => this.type(), 500);
            }
        }
    }
}

// পৃষ্ঠা লোড হলে টাইপিং ইফেক্ট শুরু করুন
document.addEventListener('DOMContentLoaded', () => {
    new TypewriterEffect();
});