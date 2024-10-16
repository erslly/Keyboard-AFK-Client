# AFK Bot

Bu proje, kullanıcıların bir süre boyunca klavye etkileşimi olmadığında otomatik olarak AFK (Away From Keyboard) moduna geçişini takip eden basit bir Discord botudur. Bot, kullanıcının AFK'ya geçtiğini ve tekrar aktif hale geldiğini belirten mesajları Discord Webhook üzerinden gönderir.

## Özellikler

- Kullanıcı belirli bir süre (AFK süresi) boyunca klavye etkileşimi olmazsa AFK moduna geçer.
- Kullanıcı aktif olduğunda AFK durumu sona erer ve bu durum webhook aracılığıyla bildirilir.
- Webhook aracılığıyla kullanıcının AFK başlangıç zamanı ve bekleme süresi embed mesajı olarak gönderilir.
- Tüm zaman damgaları Discord formatında (`<t:TIMESTAMP:F>`) gösterilir.

## Gereksinimler

Bu projeyi çalıştırabilmek için aşağıdaki yazılımlara ihtiyacınız var:

- [Node.js](https://nodejs.org/) (v14 veya üstü)

