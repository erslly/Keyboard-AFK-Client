import fetch from 'node-fetch';  
import readline from 'readline';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1296102993460072498/8QO2JF1dZbsA2EI65PcKQg2W5uWXa3KNEbaI5SFxUw4LfMld1jIQdR4gJl1f2NDKsk9N';

const AFK_TIME_LIMIT = 300000; // 5 Dakika, istediğiniz gibi değiştirebilirsiniz

let afkTimeout;
let isAFK = false;
let afkStartTime = null;  


async function sendWebhookMessage(message, embed) {
    const payload = {
        content: message,  
        username: "ersllydev",  
        avatar_url: "", // Buraya resim koymayı unutmayın
        embeds: [embed]  
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            console.error('Webhook mesajı gönderilemedi:', response.status);
        } else {
            console.log('Webhook mesajı gönderildi.');
        }
    } catch (error) {
        console.error('Webhook hatası:', error);
    }
}


function formatDiscordTimestamp(timestamp) {
    return `<t:${Math.floor(timestamp / 1000)}:F>`; 
}


function goAFK() {
    if (!isAFK) {
        isAFK = true;
        afkStartTime = Date.now();  

        console.log("Kullanıcı AFK'ya geçti.");
        
 
        const embed = {
            title: "Kullanıcı AFK'ya geçti",
            description: `Kullanıcı şu anda AFK durumunda. AFK süresi ${AFK_TIME_LIMIT / 60000} dakika.`,
            fields: [
                {
                    name: "AFK Başlama Zamanı",
                    value: formatDiscordTimestamp(afkStartTime),
                    inline: true
                },
                {
                    name: "Bekleme Süresi",
                    value: `${AFK_TIME_LIMIT / 60000} dakika`,
                    inline: true
                }
            ],
            color: 0xFF0000, 
            timestamp: new Date(),  
        };

        sendWebhookMessage("Kullanıcı AFK'ya geçti.", embed);
    }
}


function resetAFKTimer() {
    if (isAFK) {
        isAFK = false;
        console.log("Kullanıcı aktif oldu.");
        

        const embed = {
            title: "Kullanıcı Aktif Oldu",
            description: `Kullanıcı aktif oldu. AFK süresi ${AFK_TIME_LIMIT / 60000} dakikada sona erdi.`,
            color: 0x00FF00, 
            timestamp: new Date(),  
        };

        sendWebhookMessage("Kullanıcı aktif oldu.", embed);
    }

    clearTimeout(afkTimeout);
    afkTimeout = setTimeout(goAFK, AFK_TIME_LIMIT);  
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    resetAFKTimer();
});


resetAFKTimer();

console.log("AFK takibi başlatıldı. Klavye etkileşimleri AFK durumunu sıfırlar.");
