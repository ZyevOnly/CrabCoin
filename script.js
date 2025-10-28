// Основные переменные
let balance = 0;
let tapValue = 1;
let energy = 100;
let maxEnergy = 100;
let energyRecoveryRate = 1;
let autoClickerActive = false;
let autoClickerInterval;
let currentScreen = 'main';
let ownedItems = [];
let totalEarned = 0;
let totalTaps = 0;
let energyUsed = 0;
let userData = null;
let isLoggedIn = false;
let totalCrabInSystem = 0;
let exchangeRate = 1000;
let userCrab = null;

// Новые переменные для Telegram и магазина
let userSubscribed = false;
let subscriptionBonusClaimed = false;
let shopCategory = 'basic';

// Переменные для CrabPremium
let isPremiumUser = false;
let premiumAvatar = '👤';
let premiumEmoji = '';
let adminUser = null;
const PREMIUM_PRICE = 400000000; // 400 миллионов CRAB

// Премиум аватары и смайлики
const premiumAvatars = ['👑', '🎮', '⚡', '💎', '🌟', '🔥', '🚀', '🌈', '🎯', '💻'];
const premiumEmojis = ['⭐', '✨', '🎊', '🎉', '💫', '🌟', '❤️', '💎', '👑', '⚡'];

// Переменные для игры Змейка
let snakeGameActive = false;
let snakeInterval;
let snakeDirection = 'right';
let snake = [];
let snakeFood = {};
let snakeScore = 0;
let snakeReward = 0;
let snakeSpeed = 150;
let snakeBoardSize = 20; // 20x20 клеток
let snakeTotalReward = 0; // Общий выигрыш за сессию

// Переменные для Колеса Фортуны
let wheelSpinning = false;
let wheelPrizes = [
    { value: 1000, color: '#ff6b35', probability: 30 },
    { value: 5000, color: '#ff9a3c', probability: 25 },
    { value: 10000, color: '#ffdd00', probability: 20 },
    { value: 25000, color: '#4cd964', probability: 10 },
    { value: 50000, color: '#5ac8fa', probability: 8 },
    { value: 100000, color: '#9b59b6', probability: 4 },
    { value: 500000, color: '#e74c3c', probability: 2 },
    { value: 1000000, color: '#3498db', probability: 1 }
];
let currentSpins = 1;
let wheelPackPrices = {
    1: 20000,
    10: 120000,
    20: 200000
};

// Редкие крабы от сайта
const rareCrabs = [
    { id: 'rare1', name: 'Золотой Краб', type: '🌟', price: 5000000, ownerId: 'system', rarity: 'legendary' },
    { id: 'rare2', name: 'Алмазный Краб', type: '💎', price: 10000000, ownerId: 'system', rarity: 'legendary' },
    { id: 'rare3', name: 'Огненный Краб', type: '🔥', price: 7500000, ownerId: 'system', rarity: 'epic' },
    { id: 'rare4', name: 'Ледяной Краб', type: '❄️', price: 6000000, ownerId: 'system', rarity: 'epic' },
    { id: 'rare5', name: 'Космический Краб', type: '🚀', price: 15000000, ownerId: 'system', rarity: 'mythic' },
    { id: 'rare6', name: 'Радужный Краб', type: '🌈', price: 8000000, ownerId: 'system', rarity: 'epic' },
    { id: 'rare7', name: 'Темный Краб', type: '🌑', price: 12000000, ownerId: 'system', rarity: 'legendary' },
    { id: 'rare8', name: 'Кристальный Краб', type: '🔮', price: 9000000, ownerId: 'system', rarity: 'epic' }
];

// Расширенные улучшения для магазина
const shopItems = {
    basic: [
        {
            id: 'energy_boost',
            name: 'Увеличение энергии',
            description: 'Максимальная энергия +50%',
            icon: '🔋',
            price: 1000000,
            effect: 'maxEnergy',
            effectValue: 150,
            owned: false
        },
        {
            id: 'energy_recovery',
            name: 'Скорость восстановления',
            description: 'Энергия восстанавливается в 2 раза быстрее',
            icon: '⚡',
            price: 750000,
            effect: 'recoverySpeed',
            effectValue: 2,
            owned: false
        },
        {
            id: 'golden_crab',
            name: 'Золотой краб',
            description: 'Особый краб для тапа с анимацией',
            icon: '💎',
            price: 2500000,
            effect: 'goldenCrab',
            effectValue: true,
            owned: false
        },
        {
            id: 'crab_luck',
            name: 'Удача краба',
            description: 'Шанс 10% получить x10 монет за тап',
            icon: '🌟',
            price: 1500000,
            effect: 'crabLuck',
            effectValue: 0.1,
            owned: false
        }
    ],
    premium: [
        {
            id: 'quantum_tap',
            name: 'Квантовый тап',
            description: 'Тапы приносят в 3 раза больше CRAB',
            icon: '⚛️',
            price: 5000000,
            effect: 'tapMultiplier',
            effectValue: 3,
            owned: false,
            badge: 'ПРЕМИУМ'
        },
        {
            id: 'crab_army',
            name: 'Армия крабов',
            description: 'Автоматически тапает 10 раз в секунду',
            icon: '🦀',
            price: 10000000,
            effect: 'autoTap',
            effectValue: 10,
            owned: false,
            badge: 'ПРЕМИУМ'
        },
        {
            id: 'time_warp',
            name: 'Искривление времени',
            description: 'Восстановление энергии в 5 раз быстрее',
            icon: '⏰',
            price: 8000000,
            effect: 'timeWarp',
            effectValue: 5,
            owned: false,
            badge: 'ПРЕМИУМ'
        },
        {
            id: 'golden_hands',
            name: 'Золотые руки',
            description: 'Шанс 25% на удвоение дохода за тап',
            icon: '👑',
            price: 12000000,
            effect: 'goldenHands',
            effectValue: 0.25,
            owned: false,
            badge: 'ПРЕМИУМ'
        }
    ],
    legendary: [
        {
            id: 'crab_god',
            name: 'Бог крабов',
            description: 'Все доходы умножаются на 5 навсегда',
            icon: '🐉',
            price: 50000000,
            effect: 'globalMultiplier',
            effectValue: 5,
            owned: false,
            badge: 'ЛЕГЕНДАРНЫЙ'
        },
        {
            id: 'infinity_energy',
            name: 'Бесконечная энергия',
            description: 'Энергия никогда не заканчивается',
            icon: '♾️',
            price: 75000000,
            effect: 'infiniteEnergy',
            effectValue: true,
            owned: false,
            badge: 'ЛЕГЕНДАРНЫЙ'
        },
        {
            id: 'cosmic_magnet',
            name: 'Космический магнит',
            description: 'Притягивает CRAB из других вселенных',
            icon: '🌌',
            price: 100000000,
            effect: 'cosmicMagnet',
            effectValue: 1000,
            owned: false,
            badge: 'ЛЕГЕНДАРНЫЙ'
        },
        {
            id: 'quantum_processor',
            name: 'Квантовый процессор',
            description: 'Авто-тап 50 раз в секунду + пассивный доход',
            icon: '💻',
            price: 150000000,
            effect: 'quantumProcessor',
            effectValue: 50,
            owned: false,
            badge: 'ЛЕГЕНДАРНЫЙ'
        }
    ]
};

// Элементы DOM
const authScreen = document.getElementById('authScreen');
const gameContainer = document.getElementById('gameContainer');
const logoutBtn = document.getElementById('logoutBtn');
const balanceElement = document.getElementById('balance');
const coinElement = document.getElementById('coin');
const energyFillElement = document.getElementById('energyFill');
const notificationElement = document.getElementById('notification');
const particlesContainer = document.getElementById('particles');
const exchangeRateElement = document.getElementById('exchangeRate');
const currentRateElement = document.getElementById('currentRate');
const marketplaceItemsElement = document.getElementById('marketplaceItems');
const leaderboardListElement = document.getElementById('leaderboardList');
const userRankElement = document.getElementById('userRank');

// Элементы авторизации
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

// Поля форм
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const registerUsername = document.getElementById('registerUsername');
const registerTelegram = document.getElementById('registerTelegram');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerConfirmPassword = document.getElementById('registerConfirmPassword');

// Сообщения об ошибках
const loginUsernameError = document.getElementById('loginUsernameError');
const loginPasswordError = document.getElementById('loginPasswordError');
const registerUsernameError = document.getElementById('registerUsernameError');
const registerTelegramError = document.getElementById('registerTelegramError');
const registerEmailError = document.getElementById('registerEmailError');
const registerPasswordError = document.getElementById('registerPasswordError');
const registerConfirmPasswordError = document.getElementById('registerConfirmPasswordError');

// Элементы профиля
const userAvatar = document.getElementById('userAvatar');
const avatarPlaceholder = document.getElementById('avatarPlaceholder');
const userName = document.getElementById('userName');
const userId = document.getElementById('userId');
const profileButton = document.getElementById('profileButton');

// Экраны
const profileScreen = document.getElementById('profileScreen');
const shopScreen = document.getElementById('shopScreen');
const gamesScreen = document.getElementById('gamesScreen');
const snakeScreen = document.getElementById('snakeScreen');
const wheelScreen = document.getElementById('wheelScreen');
const marketplaceScreen = document.getElementById('marketplaceScreen');
const leaderboardScreen = document.getElementById('leaderboardScreen');

// Кнопки закрытия
const closeProfileBtn = document.getElementById('closeProfile');
const closeShopBtn = document.getElementById('closeShop');
const closeGamesBtn = document.getElementById('closeGames');
const closeSnakeBtn = document.getElementById('closeSnake');
const closeWheelBtn = document.getElementById('closeWheel');
const closeMarketplaceBtn = document.getElementById('closeMarketplace');
const closeLeaderboardBtn = document.getElementById('closeLeaderboard');

// Элементы профиля
const profileUsername = document.getElementById('profileUsername');
const profileTelegram = document.getElementById('profileTelegram');
const profileEmail = document.getElementById('profileEmail');
const profileRegDate = document.getElementById('profileRegDate');
const profileLastLogin = document.getElementById('profileLastLogin');

// Статистика профиля
const statTotalEarned = document.getElementById('statTotalEarned');
const statTotalTaps = document.getElementById('statTotalTaps');
const statTapPower = document.getElementById('statTapPower');
const statMaxEnergy = document.getElementById('statMaxEnergy');

// Достижения
const achievement1 = document.getElementById('achievement1');
const achievement2 = document.getElementById('achievement2');
const achievement3 = document.getElementById('achievement3');
const achievement4 = document.getElementById('achievement4');
const progress1 = document.getElementById('progress1');
const progress2 = document.getElementById('progress2');
const progress3 = document.getElementById('progress3');
const progress4 = document.getElementById('progress4');

// Инициализация бустов
const boost1 = document.getElementById('boost1');
const boost2 = document.getElementById('boost2');
const boost3 = document.getElementById('boost3');
const boost4 = document.getElementById('boost4');

// Элементы магазина
const shopItemsContainer = document.getElementById('shopItemsContainer');

// Вкладки
const tabs = document.querySelectorAll('.tab');

// Элементы Telegram модального окна
const telegramModal = document.getElementById('telegramModal');
const closeTelegramModal = document.getElementById('closeTelegramModal');
const verifySubscription = document.getElementById('verifySubscription');

// Элементы CrabPremium
const premiumModal = document.getElementById('premiumModal');
const closePremiumModal = document.getElementById('closePremiumModal');
const buyPremiumBtn = document.getElementById('buyPremiumBtn');
const premiumSection = document.getElementById('premiumSection');
const avatarSelection = document.getElementById('avatarSelection');
const emojiSelection = document.getElementById('emojiSelection');
const premiumStatus = document.getElementById('premiumStatus');
const premiumBadge = document.getElementById('premiumBadge');

// Элементы админ-панели
const adminPanel = document.getElementById('adminPanel');
const adminToggle = document.getElementById('adminToggle');
const adminScreen = document.getElementById('adminScreen');
const closeAdmin = document.getElementById('closeAdmin');
const adminTotalUsers = document.getElementById('adminTotalUsers');
const adminPremiumUsers = document.getElementById('adminPremiumUsers');
const adminTotalBalance = document.getElementById('adminTotalBalance');
const adminTotalCrab = document.getElementById('adminTotalCrab');
const adminUsersList = document.getElementById('adminUsersList');

// Элементы игры Змейка
const snakeBoard = document.getElementById('snakeBoard');
const snakeScoreElement = document.getElementById('snakeScore');
const snakeLengthElement = document.getElementById('snakeLength');
const snakeRewardElement = document.getElementById('snakeReward');
const snakeUpBtn = document.getElementById('snakeUp');
const snakeLeftBtn = document.getElementById('snakeLeft');
const snakeRightBtn = document.getElementById('snakeRight');
const snakeDownBtn = document.getElementById('snakeDown');
const snakeGameOver = document.getElementById('snakeGameOver');
const finalScoreElement = document.getElementById('finalScore');
const finalRewardElement = document.getElementById('finalReward');
const finalPenaltyElement = document.getElementById('finalPenalty');
const snakeRestartBtn = document.getElementById('snakeRestart');

// Элементы Колеса Фортуны
const wheel = document.getElementById('wheel');
const wheelSpinBtn = document.getElementById('wheelSpinBtn');
const wheelResult = document.getElementById('wheelResult');
const wheelPrize = document.getElementById('wheelPrize');
const wheelPacks = document.querySelectorAll('.wheel-pack');

// Карточки игр
const gameCards = document.querySelectorAll('.game-card');

// Локальная база данных
const Database = {
    users: {},
    system: {
        totalCrab: 0,
        exchangeRate: 1000
    },
    
    init: function() {
        const savedUsers = localStorage.getItem('crabcoin_users');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }
        
        // Создаем админ пользователя если его нет
        if (!this.users['iliazyev']) {
            this.createUser({
                username: 'iliazyev',
                telegram: '@iliazyev',
                email: 'iliazyev@admin.com',
                password: '50345606789'
            });
            
            // Обновляем админа с дополнительными полями
            this.users['iliazyev'] = {
                ...this.users['iliazyev'],
                balance: 1000000000,
                isPremium: true,
                premiumAvatar: '👑',
                premiumSince: new Date().toISOString(),
                owned_items: ['energy_boost', 'energy_recovery', 'golden_crab', 'crab_luck', 'quantum_tap', 'crab_army', 'time_warp', 'golden_hands']
            };
            this.save();
        }
        
        const savedSystem = localStorage.getItem('crabcoin_system');
        if (savedSystem) {
            const systemData = JSON.parse(savedSystem);
            this.system = { ...this.system, ...systemData };
            totalCrabInSystem = this.system.totalCrab;
            exchangeRate = this.system.exchangeRate;
        }
    },
    
    save: function() {
        localStorage.setItem('crabcoin_users', JSON.stringify(this.users));
        this.system.totalCrab = totalCrabInSystem;
        this.system.exchangeRate = exchangeRate;
        localStorage.setItem('crabcoin_system', JSON.stringify(this.system));
    },
    
    generateId: function() {
        return Math.floor(Math.random() * 1000000) + 1;
    },
    
    findUserByUsername: function(username) {
        return Object.values(this.users).find(user => 
            user.username.toLowerCase() === username.toLowerCase() || 
            user.email.toLowerCase() === username.toLowerCase()
        );
    },
    
    findUserByEmail: function(email) {
        return Object.values(this.users).find(user => 
            user.email.toLowerCase() === email.toLowerCase()
        );
    },
    
    findUserByTelegram: function(telegram) {
        return Object.values(this.users).find(user => 
            user.telegram.toLowerCase() === telegram.toLowerCase()
        );
    },
    
    createUser: function(userData) {
        const id = userData.username; // Используем username как ID для простоты
        const newUser = {
            id: id,
            username: userData.username,
            telegram: userData.telegram,
            email: userData.email,
            password: userData.password,
            balance: 0,
            total_earned: 0,
            total_taps: 0,
            energy_used: 0,
            tap_value: 1,
            energy: 100,
            max_energy: 100,
            owned_items: [],
            registration_date: new Date().toISOString(),
            last_login: new Date().toISOString(),
            crab: null,
            userSubscribed: false,
            subscriptionBonusClaimed: false,
            telegramModalShown: false,
            // Новые поля для CrabPremium
            isPremium: false,
            premiumAvatar: '👤',
            premiumEmoji: '',
            premiumSince: null
        };
        
        this.users[id] = newUser;
        this.save();
        return newUser;
    },
    
    updateUser: function(userId, updates) {
        if (this.users[userId]) {
            this.users[userId] = { ...this.users[userId], ...updates };
            this.save();
            return this.users[userId];
        }
        return null;
    },
    
    validatePassword: function(user, password) {
        return user.password === password;
    },
    
    getLeaderboard: function() {
        return Object.values(this.users)
            .sort((a, b) => (b.balance || 0) - (a.balance || 0))
            .slice(0, 10);
    },
    
    getUserRank: function(userId) {
        const sortedUsers = Object.values(this.users)
            .sort((a, b) => (b.balance || 0) - (a.balance || 0));
        return sortedUsers.findIndex(user => user.id === userId) + 1;
    }
};

// Функция проверки админ-прав
function checkAdminRights(username, password) {
    return username.toLowerCase() === 'iliazyev' && password === '50345606789';
}

// Функция покупки CrabPremium
function buyCrabPremium() {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    if (balance < PREMIUM_PRICE) {
        showNotification('Недостаточно CRAB для покупки CrabPremium! Нужно 400,000,000 CRAB');
        return;
    }
    
    if (isPremiumUser) {
        showNotification('У вас уже есть CrabPremium!');
        return;
    }
    
    // Списываем стоимость
    balance -= PREMIUM_PRICE;
    updateBalance();
    
    // Активируем премиум
    isPremiumUser = true;
    premiumAvatar = '👑';
    
    // Сохраняем в базу
    Database.updateUser(userData.id, {
        isPremium: true,
        premiumAvatar: '👑',
        premiumEmoji: '',
        premiumSince: new Date().toISOString()
    });
    
    // Обновляем интерфейс
    updatePremiumInterface();
    showNotification('🎉 Поздравляем! Теперь у вас есть CrabPremium!');
    
    // Закрываем модальное окно
    premiumModal.style.display = 'none';
    
    // Сохраняем данные
    saveUserData();
}

// Функция обновления премиум интерфейса
function updatePremiumInterface() {
    if (isPremiumUser) {
        // Добавляем премиум класс к основным элементам
        document.body.classList.add('premium-user');
        document.querySelector('.game-container').classList.add('premium-user');
        
        // Обновляем аватар
        const avatarElement = document.querySelector('.profile-avatar');
        avatarElement.innerHTML = `<span>${premiumAvatar}</span>`;
        avatarElement.classList.add('premium-avatar');
        
        // Обновляем статус в профиле
        premiumStatus.textContent = 'Premium';
        premiumBadge.style.display = 'inline-block';
        
        // Показываем секцию премиум
        premiumSection.style.display = 'block';
        
        // Добавляем смайлик к имени пользователя
        const userNameElement = document.querySelector('.profile-name');
        if (premiumEmoji) {
            userNameElement.innerHTML = `<span class="premium-emoji">${premiumEmoji}</span>${userData.username}`;
        }
        
        // Заполняем выбор аватарок и смайликов
        updateAvatarSelection();
        updateEmojiSelection();
    } else {
        // Убираем премиум классы
        document.body.classList.remove('premium-user');
        document.querySelector('.game-container').classList.remove('premium-user');
        
        // Возвращаем обычный аватар
        const avatarElement = document.querySelector('.profile-avatar');
        avatarElement.innerHTML = `<span>${userData.username ? userData.username[0].toUpperCase() : 'U'}</span>`;
        avatarElement.classList.remove('premium-avatar');
        
        // Обновляем статус
        premiumStatus.textContent = 'Базовый';
        premiumBadge.style.display = 'none';
        
        // Скрываем секцию премиум
        premiumSection.style.display = 'none';
    }
}

// Функция обновления выбора аватарок
function updateAvatarSelection() {
    avatarSelection.innerHTML = '';
    
    premiumAvatars.forEach(avatar => {
        const avatarOption = document.createElement('div');
        avatarOption.className = `avatar-option ${avatar === premiumAvatar ? 'selected' : ''}`;
        avatarOption.innerHTML = avatar;
        avatarOption.onclick = () => selectAvatar(avatar);
        avatarSelection.appendChild(avatarOption);
    });
}

// Функция выбора аватарки
function selectAvatar(avatar) {
    premiumAvatar = avatar;
    
    // Обновляем в базе
    Database.updateUser(userData.id, {
        premiumAvatar: avatar
    });
    
    // Обновляем интерфейс
    updatePremiumInterface();
    
    // Сохраняем данные
    saveUserData();
}

// Функция обновления выбора смайликов
function updateEmojiSelection() {
    emojiSelection.innerHTML = '';
    
    premiumEmojis.forEach(emoji => {
        const emojiOption = document.createElement('div');
        emojiOption.className = `emoji-option ${emoji === premiumEmoji ? 'selected' : ''}`;
        emojiOption.innerHTML = emoji;
        emojiOption.onclick = () => selectEmoji(emoji);
        emojiSelection.appendChild(emojiOption);
    });
}

// Функция выбора смайлика
function selectEmoji(emoji) {
    premiumEmoji = emoji;
    
    // Обновляем в базе
    Database.updateUser(userData.id, {
        premiumEmoji: emoji
    });
    
    // Обновляем интерфейс
    updatePremiumInterface();
    
    // Сохраняем данные
    saveUserData();
}

// Функция отображения админ-панели
function showAdminPanel() {
    if (!adminUser) return;
    
    adminScreen.style.display = 'block';
    updateAdminPanel();
}

// Функция обновления админ-панели
function updateAdminPanel() {
    if (!adminUser) return;
    
    const users = Object.values(Database.users);
    const premiumUsers = users.filter(user => user.isPremium);
    const totalBalance = users.reduce((sum, user) => sum + (user.balance || 0), 0);
    
    // Обновляем статистику
    adminTotalUsers.textContent = users.length;
    adminPremiumUsers.textContent = premiumUsers.length;
    adminTotalBalance.textContent = totalBalance.toLocaleString();
    adminTotalCrab.textContent = totalCrabInSystem.toLocaleString();
    
    // Обновляем список пользователей
    adminUsersList.innerHTML = '';
    
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'admin-user-item';
        
        userItem.innerHTML = `
            <div class="admin-user-info">
                <div class="leaderboard-avatar">${user.premiumAvatar || (user.username ? user.username[0].toUpperCase() : 'U')}</div>
                <div>
                    <div>${user.username} ${user.isPremium ? '👑' : ''}</div>
                    <div style="font-size: 12px; opacity: 0.7;">ID: ${user.id} | ${(user.balance || 0).toLocaleString()} CRAB</div>
                </div>
            </div>
            <div class="admin-user-actions">
                <button class="admin-action-btn premium" onclick="grantPremium('${user.id}')">
                    ${user.isPremium ? '✔ Премиум' : 'Выдать премиум'}
                </button>
                <button class="admin-action-btn coins" onclick="addBalance('${user.id}', 1000000)">
                    +1M CRAB
                </button>
                <button class="admin-action-btn" onclick="addBalance('${user.id}', 100000000)">
                    +100M CRAB
                </button>
                <button class="admin-action-btn delete" onclick="deleteUser('${user.id}')">
                    Удалить
                </button>
            </div>
        `;
        
        adminUsersList.appendChild(userItem);
    });
}

// Функция выдачи премиума (для админа)
function grantPremium(userId) {
    if (!adminUser) return;
    
    const user = Database.users[userId];
    if (!user) return;
    
    Database.updateUser(userId, {
        isPremium: true,
        premiumAvatar: '👑',
        premiumSince: new Date().toISOString()
    });
    
    showNotification(`Премиум выдан пользователю ${user.username}`);
    updateAdminPanel();
}

// Функция добавления баланса (для админа)
function addBalance(userId, amount) {
    if (!adminUser) return;
    
    const user = Database.users[userId];
    if (!user) return;
    
    const newBalance = (user.balance || 0) + amount;
    Database.updateUser(userId, {
        balance: newBalance
    });
    
    showNotification(`Баланс пользователя ${user.username} увеличен на ${amount.toLocaleString()} CRAB`);
    updateAdminPanel();
    updateTotalCrab();
}

// Функция удаления пользователя (для админа)
function deleteUser(userId) {
    if (!adminUser) return;
    
    const user = Database.users[userId];
    if (!user) return;
    
    if (confirm(`Удалить пользователя ${user.username}?`)) {
        delete Database.users[userId];
        Database.save();
        showNotification(`Пользователь ${user.username} удален`);
        updateAdminPanel();
        updateTotalCrab();
    }
}

// Функция показа модального окна Telegram
function showTelegramModal() {
    if (!userData.telegramModalShown) {
        setTimeout(() => {
            telegramModal.style.display = 'flex';
            Database.updateUser(userData.id, {
                telegramModalShown: true
            });
        }, 2000);
    }
}

// Функция проверки подписки (имитация)
function checkSubscription() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const subscribed = Math.random() < 0.7;
            resolve(subscribed);
        }, 2000);
    });
}

// Функция выдачи бонуса за подписку
function grantSubscriptionBonus() {
    if (subscriptionBonusClaimed) return;
    
    balance += 50000;
    totalEarned += 50000;
    
    activateTemporaryBoost('subscriptionBoost', 2, 3600000);
    
    subscriptionBonusClaimed = true;
    userSubscribed = true;
    
    updateBalance();
    showNotification('🎉 Бонус за подписку получен! +50,000 CRAB и x2 доход на 1 час!');
    
    Database.updateUser(userData.id, {
        subscriptionBonusClaimed: true,
        userSubscribed: true
    });
    
    telegramModal.style.display = 'none';
    
    // Сохраняем данные
    saveUserData();
}

// Функция активации временного буста
function activateTemporaryBoost(type, multiplier, duration) {
    switch (type) {
        case 'subscriptionBoost':
            const originalTapValue = tapValue;
            tapValue *= multiplier;
            
            showNotification(`Активирован буст x${multiplier} на 1 час!`);
            
            setTimeout(() => {
                tapValue = originalTapValue;
                showNotification('Буст подписки закончился');
            }, duration);
            break;
    }
}

// Функция обновления магазина
function updateShopDisplay() {
    if (!shopItemsContainer) return;
    
    const categoriesHTML = `
        <div class="shop-categories">
            <button class="shop-category ${shopCategory === 'basic' ? 'active' : ''}" data-category="basic">
                Основные
            </button>
            <button class="shop-category ${shopCategory === 'premium' ? 'active' : ''}" data-category="premium">
                Премиум
            </button>
            <button class="shop-category ${shopCategory === 'legendary' ? 'active' : ''}" data-category="legendary">
                Легендарные
            </button>
        </div>
    `;
    
    const items = shopItems[shopCategory];
    let itemsHTML = '<div class="shop-items-grid">';
    
    items.forEach(item => {
        const isOwned = ownedItems.includes(item.id);
        const canAfford = balance >= item.price;
        
        itemsHTML += `
            <div class="shop-item-premium ${isOwned ? 'owned' : ''}" data-item="${item.id}">
                ${item.badge ? `<div class="shop-item-badge">${item.badge}</div>` : ''}
                <div class="shop-item-header">
                    <div class="shop-item-icon-premium">${item.icon}</div>
                    <div class="shop-item-info-premium">
                        <div class="shop-item-name-premium">${item.name}</div>
                        <div class="shop-item-desc-premium">${item.description}</div>
                    </div>
                </div>
                <div class="shop-item-price-premium">${item.price.toLocaleString()} CRAB</div>
                <div class="shop-item-effect">${getItemEffectDescription(item)}</div>
                ${!isOwned ? `
                    <div class="shop-item-stats">
                        <div>Доступно: ${canAfford ? '✅' : '❌'}</div>
                        <div>${getItemRequirement(item)}</div>
                    </div>
                ` : `
                    <div class="shop-item-stats">
                        <div>Статус: ✅ Куплено</div>
                        <div>Эффект активен</div>
                    </div>
                `}
            </div>
        `;
    });
    
    itemsHTML += '</div>';
    shopItemsContainer.innerHTML = categoriesHTML + itemsHTML;
    
    document.querySelectorAll('.shop-category').forEach(btn => {
        btn.addEventListener('click', () => {
            shopCategory = btn.getAttribute('data-category');
            updateShopDisplay();
        });
    });
    
    document.querySelectorAll('.shop-item-premium:not(.owned)').forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('data-item');
            buyShopItem(itemId);
        });
    });
}

// Функция получения описания эффекта
function getItemEffectDescription(item) {
    switch (item.effect) {
        case 'maxEnergy':
            return `Макс. энергия: ${item.effectValue}`;
        case 'recoverySpeed':
            return `Скорость восстановления: x${item.effectValue}`;
        case 'goldenCrab':
            return 'Особая анимация краба';
        case 'crabLuck':
            return `Шанс x10: ${item.effectValue * 100}%`;
        case 'tapMultiplier':
            return `Множитель тапов: x${item.effectValue}`;
        case 'autoTap':
            return `Авто-тап: ${item.effectValue}/сек`;
        case 'timeWarp':
            return `Скорость времени: x${item.effectValue}`;
        case 'goldenHands':
            return `Шанс x2: ${item.effectValue * 100}%`;
        case 'globalMultiplier':
            return `Глобальный множитель: x${item.effectValue}`;
        case 'infiniteEnergy':
            return 'Бесконечная энергия';
        case 'cosmicMagnet':
            return `Пассивный доход: +${item.effectValue}/сек`;
        case 'quantumProcessor':
            return `Авто-тап: ${item.effectValue}/сек + пассивный доход`;
        default:
            return 'Особый эффект';
    }
}

// Функция получения требований для предмета
function getItemRequirement(item) {
    switch (item.id) {
        case 'crab_god':
            return 'Нужно: 50M CRAB';
        case 'infinity_energy':
            return 'Нужно: 75M CRAB';
        case 'cosmic_magnet':
            return 'Нужно: 100M CRAB';
        case 'quantum_processor':
            return 'Нужно: 150M CRAB';
        default:
            return '';
    }
}

// Обновленная функция покупки в магазине
function buyShopItem(itemId) {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    let item = null;
    let category = null;
    
    for (const cat in shopItems) {
        const foundItem = shopItems[cat].find(i => i.id === itemId);
        if (foundItem) {
            item = foundItem;
            category = cat;
            break;
        }
    }
    
    if (!item) {
        showNotification('Предмет не найден!');
        return;
    }
    
    if (ownedItems.includes(itemId)) {
        showNotification('Уже куплено!');
        return;
    }
    
    if (balance < item.price) {
        showNotification('Недостаточно CRAB!');
        return;
    }
    
    if (category === 'legendary') {
        if (!checkLegendaryRequirements(itemId)) {
            return;
        }
    }
    
    balance -= item.price;
    updateBalance();
    ownedItems.push(itemId);
    
    applyItemEffect(item);
    
    showNotification(`Покупка успешна! Приобретен: ${item.name}`);
    updateShopDisplay();
    
    // Сохраняем данные пользователя
    saveUserData();
}

// Функция проверки требований для легендарных предметов
function checkLegendaryRequirements(itemId) {
    switch (itemId) {
        case 'crab_god':
            if (totalEarned < 10000000) {
                showNotification('Нужно заработать минимум 10M CRAB!');
                return false;
            }
            break;
        case 'infinity_energy':
            if (!ownedItems.includes('energy_boost')) {
                showNotification('Сначала купите улучшение энергии!');
                return false;
            }
            break;
        case 'cosmic_magnet':
            if (userCrab === null) {
                showNotification('Сначала купите редкого краба!');
                return false;
            }
            break;
        case 'quantum_processor':
            if (!ownedItems.includes('crab_army')) {
                showNotification('Сначала купите Армию крабов!');
                return false;
            }
            break;
    }
    return true;
}

// Функция применения эффекта предмета
function applyItemEffect(item) {
    switch (item.effect) {
        case 'maxEnergy':
            maxEnergy = item.effectValue;
            energy = Math.min(energy, maxEnergy);
            updateEnergy();
            break;
            
        case 'recoverySpeed':
            energyRecoveryRate = item.effectValue;
            break;
            
        case 'goldenCrab':
            break;
            
        case 'crabLuck':
            break;
            
        case 'tapMultiplier':
            tapValue *= item.effectValue;
            break;
            
        case 'autoTap':
            startAdvancedAutoClicker(item.effectValue);
            break;
            
        case 'timeWarp':
            energyRecoveryRate *= item.effectValue;
            break;
            
        case 'goldenHands':
            break;
            
        case 'globalMultiplier':
            tapValue *= item.effectValue;
            break;
            
        case 'infiniteEnergy':
            const infiniteEnergyInterval = setInterval(() => {
                if (isLoggedIn) {
                    energy = maxEnergy;
                    updateEnergy();
                } else {
                    clearInterval(infiniteEnergyInterval);
                }
            }, 100);
            break;
            
        case 'cosmic_magnet':
            startPassiveIncome(item.effectValue);
            break;
            
        case 'quantum_processor':
            startAdvancedAutoClicker(item.effectValue);
            startPassiveIncome(500);
            break;
    }
}

// Функция продвинутого автокликера
function startAdvancedAutoClicker(tapsPerSecond) {
    if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
    }
    
    autoClickerActive = true;
    autoClickerInterval = setInterval(() => {
        if (energy > 0) {
            const taps = Math.floor(tapsPerSecond / 10);
            for (let i = 0; i < taps; i++) {
                if (energy > 0) {
                    balance += tapValue;
                    totalEarned += tapValue;
                    energy -= 0.1;
                    energyUsed += 0.1;
                }
            }
            
            updateBalance();
            updateEnergy();
            
            const rect = coinElement.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createParticles(x, y, 3);
        }
    }, 100);
}

// Функция пассивного дохода
function startPassiveIncome(incomePerSecond) {
    setInterval(() => {
        if (isLoggedIn) {
            const income = incomePerSecond / 10;
            balance += income;
            totalEarned += income;
            updateBalance();
            
            if (Math.random() < 0.001) {
                showNotification(`Пассивный доход: +${incomePerSecond} CRAB/сек`);
            }
        }
    }, 100);
}

// Функция расчета курса обмена
function calculateExchangeRate() {
    let baseRate = 1000;
    let crabFactor = Math.log10(totalCrabInSystem + 1) / 10;
    let timeFactor = Date.now() / 1000000000;
    let randomFactor = 1 + (Math.random() * 0.04 - 0.02);
    let newRate = Math.round(baseRate * (1 + crabFactor + timeFactor) * randomFactor);
    newRate = Math.max(1000, newRate);
    return newRate;
}

// Функция обновления курса
function updateExchangeRate() {
    exchangeRate = calculateExchangeRate();
    exchangeRateElement.textContent = `1 TON = ${exchangeRate.toLocaleString()} CRAB`;
    currentRateElement.textContent = `1 TON = ${exchangeRate.toLocaleString()} CRAB`;
    Database.save();
}

// Функция обновления общего количества CRAB в системе
function updateTotalCrab() {
    let total = 0;
    Object.values(Database.users).forEach(user => {
        total += user.balance || 0;
    });
    totalCrabInSystem = total;
    updateExchangeRate();
}

// Функция обновления маркетплейса
function updateMarketplace() {
    marketplaceItemsElement.innerHTML = '';
    
    rareCrabs.forEach(crab => {
        const crabElement = document.createElement('div');
        crabElement.className = 'crab-item';
        
        if (crab.rarity === 'mythic') {
            crabElement.style.background = 'linear-gradient(45deg, #ff6b35, #9b59b6, #3498db)';
        } else if (crab.rarity === 'legendary') {
            crabElement.style.background = 'linear-gradient(45deg, #ff6b35, #f1c40f)';
        } else if (crab.rarity === 'epic') {
            crabElement.style.background = 'linear-gradient(45deg, #ff6b35, #e74c3c)';
        }
        
        crabElement.innerHTML = `
            <div class="crab-icon">${crab.type}</div>
            <div class="crab-name">${crab.name}</div>
            <div class="crab-price">${crab.price.toLocaleString()} CRAB</div>
            <div class="crab-owner">CrabCoin</div>
        `;
        
        if (userCrab && userCrab.id === crab.id) {
            crabElement.style.opacity = '0.5';
            crabElement.style.cursor = 'default';
        } else {
            crabElement.addEventListener('click', () => buyCrab(crab.id));
        }
        
        marketplaceItemsElement.appendChild(crabElement);
    });
}

// Функция покупки краба
function buyCrab(crabId) {
    const crab = rareCrabs.find(c => c.id === crabId);
    if (!crab) {
        showNotification('Краб не найден!');
        return;
    }
    
    if (balance < crab.price) {
        showNotification('Недостаточно CRAB для покупки!');
        return;
    }
    
    if (userCrab) {
        showNotification('У вас уже есть краб!');
        return;
    }
    
    balance -= crab.price;
    updateBalance();
    userCrab = crab;
    
    showNotification(`Вы купили редкого краба "${crab.name}"!`);
    updateMarketplace();
    updateAchievements();
    
    // Сохраняем данные пользователя
    saveUserData();
}

// Функция обновления топа игроков
function updateLeaderboard() {
    leaderboardListElement.innerHTML = '';
    
    const leaderboard = Database.getLeaderboard();
    const userRank = Database.getUserRank(userData.id);
    
    userRankElement.textContent = `#${userRank}`;
    
    leaderboard.forEach((user, index) => {
        const rank = index + 1;
        const isCurrentUser = user.id === userData.id;
        
        const leaderboardItem = document.createElement('div');
        leaderboardItem.className = `leaderboard-item ${isCurrentUser ? 'leaderboard-you' : ''}`;
        
        leaderboardItem.innerHTML = `
            <div class="leaderboard-rank">${rank}</div>
            <div class="leaderboard-avatar">${user.premiumAvatar || (user.username ? user.username[0].toUpperCase() : 'U')}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${user.username}</div>
                <div class="leaderboard-balance">${(user.balance || 0).toLocaleString()} CRAB</div>
            </div>
        `;
        
        leaderboardListElement.appendChild(leaderboardItem);
    });
}

// Функция обновления профиля
function updateProfile() {
    if (!userData) return;
    
    profileUsername.textContent = userData.username || '-';
    profileTelegram.textContent = userData.telegram || '-';
    profileEmail.textContent = userData.email || '-';
    
    const regDate = new Date(userData.registration_date);
    profileRegDate.textContent = regDate.toLocaleDateString('ru-RU');
    
    statTotalEarned.textContent = totalEarned.toLocaleString();
    statTotalTaps.textContent = totalTaps.toLocaleString();
    statTapPower.textContent = tapValue.toLocaleString();
    statMaxEnergy.textContent = maxEnergy.toLocaleString();
}

// Функция обновления достижений
function updateAchievements() {
    const progress1Value = Math.min(totalEarned / 1000 * 100, 100);
    progress1.style.width = progress1Value + '%';
    if (totalEarned >= 1000) {
        achievement1.classList.remove('locked');
        achievement1.style.background = 'linear-gradient(45deg, #ff6b35, #f1c40f)';
    }
    
    const progress2Value = Math.min(totalEarned / 1000000 * 100, 100);
    progress2.style.width = progress2Value + '%';
    if (totalEarned >= 1000000) {
        achievement2.classList.remove('locked');
        achievement2.style.background = 'linear-gradient(45deg, #ff6b35, #9b59b6)';
    }
    
    const progress3Value = Math.min(energyUsed / 1000 * 100, 100);
    progress3.style.width = progress3Value + '%';
    if (energyUsed >= 1000) {
        achievement3.classList.remove('locked');
        achievement3.style.background = 'linear-gradient(45deg, #ff6b35, #3498db)';
    }
    
    progress4.style.width = userCrab ? '100%' : '0%';
    if (userCrab) {
        achievement4.classList.remove('locked');
        achievement4.style.background = 'linear-gradient(45deg, #ff6b35, #e74c3c)';
    }
}

// Функция создания эффекта ripple
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    document.querySelector('.coin-container').appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Функция создания эффекта частиц
function createParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const size = Math.random() * 15 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        const colors = ['#ffdd00', '#ff6b35', '#ff9a3c', '#ffcc00'];
        particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, #ff6b35)`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.style.opacity = '1';
            particle.style.transform = `translate(${targetX - x}px, ${targetY - y}px) scale(0)`;
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }, 10);
    }
}

// Функция создания анимации краба
function createCrabAnimation(x, y) {
    const crab = document.createElement('div');
    crab.classList.add('crab-animation');
    
    const crabType = userCrab?.type || '🦀';
    
    crab.textContent = crabType;
    crab.style.left = x + 'px';
    crab.style.top = y + 'px';
    
    const size = Math.random() * 30 + 30;
    crab.style.fontSize = size + 'px';
    
    document.querySelector('.coin-container').appendChild(crab);
    
    setTimeout(() => {
        crab.style.opacity = '1';
        crab.style.transform = 'translateY(-100px) scale(1.5)';
        
        setTimeout(() => {
            crab.style.opacity = '0';
            crab.style.transform = 'translateY(-200px) scale(0.5)';
            
            setTimeout(() => {
                crab.remove();
            }, 500);
        }, 800);
    }, 10);
}

// Функция создания эффекта монеты
function createCoinEffect() {
    coinElement.classList.add('pulse');
    setTimeout(() => {
        coinElement.classList.remove('pulse');
    }, 300);
}

// Функции для игры Змейка
function initSnakeGame() {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    snakeGameActive = true;
    snakeDirection = 'right';
    snakeScore = 0;
    snakeReward = 0;
    snakeTotalReward = 0;
    snakeSpeed = 150;
    
    // Инициализация змейки
    snake = [
        {x: 5, y: 10},
        {x: 4, y: 10},
        {x: 3, y: 10}
    ];
    
    // Генерация еды
    generateFood();
    
    // Обновление интерфейса
    updateSnakeUI();
    
    // Запуск игрового цикла
    if (snakeInterval) clearInterval(snakeInterval);
    snakeInterval = setInterval(moveSnake, snakeSpeed);
    
    // Обработка клавиш
    document.addEventListener('keydown', handleSnakeKeyPress);
}

// Функция генерации еды
function generateFood() {
    let foodX, foodY;
    let validPosition = false;
    
    while (!validPosition) {
        foodX = Math.floor(Math.random() * snakeBoardSize);
        foodY = Math.floor(Math.random() * snakeBoardSize);
        
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === foodX && segment.y === foodY) {
                validPosition = false;
                break;
            }
        }
    }
    
    snakeFood = {x: foodX, y: foodY};
}

// Функция движения змейки
function moveSnake() {
    if (!snakeGameActive) return;
    
    const head = {...snake[0]};
    
    // Определение нового положения головы
    switch (snakeDirection) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    // Проверка столкновения со стенами
    if (head.x < 0 || head.x >= snakeBoardSize || head.y < 0 || head.y >= snakeBoardSize) {
        gameOver();
        return;
    }
    
    // Проверка столкновения с собой
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            gameOver();
            return;
        }
    }
    
    // Добавление новой головы
    snake.unshift(head);
    
    // Проверка съедания еды
    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        // Увеличение счета
        snakeScore += 10;
        
        // Расчет награды (от 20к до 50к CRAB)
        const baseReward = 20000;
        const randomBonus = Math.floor(Math.random() * 30001); // от 0 до 30000
        const reward = baseReward + randomBonus;
        snakeReward += reward;
        snakeTotalReward += reward;
        
        // Обновление баланса
        balance += reward;
        totalEarned += reward;
        updateBalance();
        
        // Генерация новой еды
        generateFood();
        
        // Увеличение скорости каждые 50 очков
        if (snakeScore % 50 === 0 && snakeSpeed > 50) {
            snakeSpeed -= 10;
            clearInterval(snakeInterval);
            snakeInterval = setInterval(moveSnake, snakeSpeed);
        }
        
        // Показ уведомления о награде
        showNotification(`+${reward.toLocaleString()} CRAB за еду!`);
    } else {
        // Удаление хвоста, если еда не съедена
        snake.pop();
    }
    
    // Обновление интерфейса
    updateSnakeUI();
}

// Функция обновления интерфейса игры
function updateSnakeUI() {
    // Очистка игрового поля
    snakeBoard.innerHTML = '';
    
    // Отрисовка змейки
    snake.forEach((segment, index) => {
        const cell = document.createElement('div');
        cell.className = index === 0 ? 'snake-cell snake-head' : 'snake-cell';
        cell.style.left = (segment.x * 15) + 'px';
        cell.style.top = (segment.y * 15) + 'px';
        snakeBoard.appendChild(cell);
    });
    
    // Отрисовка еды
    const food = document.createElement('div');
    food.className = 'snake-food';
    food.style.left = (snakeFood.x * 15) + 'px';
    food.style.top = (snakeFood.y * 15) + 'px';
    snakeBoard.appendChild(food);
    
    // Обновление статистики
    snakeScoreElement.textContent = snakeScore;
    snakeLengthElement.textContent = snake.length;
    snakeRewardElement.textContent = snakeReward.toLocaleString();
}

// Функция обработки нажатий клавиш
function handleSnakeKeyPress(event) {
    if (!snakeGameActive) return;
    
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection !== 'down') snakeDirection = 'up';
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'up') snakeDirection = 'down';
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'right') snakeDirection = 'left';
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'left') snakeDirection = 'right';
            break;
    }
}

// Функция окончания игры
function gameOver() {
    snakeGameActive = false;
    clearInterval(snakeInterval);
    
    // Расчет штрафа - списание 90% выигрыша
    const penalty = Math.floor(snakeTotalReward * 0.9);
    const finalReward = snakeTotalReward - penalty;
    
    // Обновление баланса с учетом штрафа
    balance = balance - snakeTotalReward + finalReward;
    updateBalance();
    
    // Показ экрана окончания игры
    finalScoreElement.textContent = snakeScore;
    finalRewardElement.textContent = finalReward.toLocaleString();
    finalPenaltyElement.textContent = penalty.toLocaleString();
    snakeGameOver.classList.add('active');
    
    // Сохранение данных пользователя
    saveUserData();
}

// Функция перезапуска игры
function restartSnakeGame() {
    snakeGameOver.classList.remove('active');
    initSnakeGame();
}

// Функция выхода из игры
function exitSnakeGame() {
    snakeGameActive = false;
    clearInterval(snakeInterval);
    document.removeEventListener('keydown', handleSnakeKeyPress);
    changeScreen('games');
}

// Функции для Колеса Фортуны
function initWheel() {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    // Создание призов на колесе
    const wheelPrizesElement = document.querySelector('.wheel-prizes');
    wheelPrizesElement.innerHTML = '';
    
    const segmentAngle = 360 / wheelPrizes.length;
    
    wheelPrizes.forEach((prize, index) => {
        const prizeElement = document.createElement('div');
        prizeElement.className = 'wheel-prize';
        prizeElement.style.transform = `rotate(${index * segmentAngle}deg)`;
        
        const prizeText = document.createElement('div');
        prizeText.className = 'wheel-prize-text';
        prizeText.textContent = prize.value.toLocaleString();
        prizeElement.appendChild(prizeText);
        
        wheelPrizesElement.appendChild(prizeElement);
    });
    
    // Обновление кнопки спина
    updateWheelSpinButton();
}

function updateWheelSpinButton() {
    const price = wheelPackPrices[currentSpins];
    wheelSpinBtn.textContent = `Крутить за ${price.toLocaleString()} CRAB`;
    wheelSpinBtn.disabled = balance < price;
}

function spinWheel() {
    if (wheelSpinning) return;
    
    const price = wheelPackPrices[currentSpins];
    
    if (balance < price) {
        showNotification('Недостаточно CRAB для прокрутки!');
        return;
    }
    
    // Списываем стоимость прокрутки
    balance -= price;
    updateBalance();
    
    wheelSpinning = true;
    wheelSpinBtn.disabled = true;
    wheelResult.style.display = 'none';
    
    // Выбор приза с учетом вероятности
    const randomValue = Math.random() * 100;
    let cumulativeProbability = 0;
    let selectedPrize = wheelPrizes[0];
    
    for (const prize of wheelPrizes) {
        cumulativeProbability += prize.probability;
        if (randomValue <= cumulativeProbability) {
            selectedPrize = prize;
            break;
        }
    }
    
    // Анимация вращения
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 полных оборотов
    const targetAngle = 360 * spins + (360 - (wheelPrizes.indexOf(selectedPrize) * 45) - 22.5);
    
    wheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
    wheel.style.transform = `rotate(${targetAngle}deg)`;
    
    // Показ результата после завершения анимации
    setTimeout(() => {
        // Начисление выигрыша
        const totalWin = selectedPrize.value * currentSpins;
        balance += totalWin;
        totalEarned += totalWin;
        updateBalance();
        
        // Показ результата
        wheelPrize.textContent = totalWin.toLocaleString() + ' CRAB';
        wheelResult.style.display = 'block';
        
        showNotification(`🎉 Поздравляем! Вы выиграли ${totalWin.toLocaleString()} CRAB!`);
        
        wheelSpinning = false;
        wheelSpinBtn.disabled = false;
        updateWheelSpinButton();
        
        saveUserData();
    }, 4000);
}

function exitWheel() {
    wheelSpinning = false;
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    changeScreen('games');
}

// Инициализация базы данных
Database.init();
updateTotalCrab();

// Функции валидации
const Validator = {
    validateUsername: function(username) {
        if (!username || username.length < 3) {
            return 'Логин должен содержать минимум 3 символа';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return 'Логин может содержать только буквы, цифры и подчеркивания';
        }
        if (Database.findUserByUsername(username)) {
            return 'Пользователь с таким логином уже существует';
        }
        return null;
    },
    
    validateTelegram: function(telegram) {
        if (!telegram) {
            return 'Укажите ваш Telegram';
        }
        if (!telegram.startsWith('@')) {
            return 'Telegram должен начинаться с @';
        }
        if (telegram.length < 5) {
            return 'Некорректный формат Telegram';
        }
        if (Database.findUserByTelegram(telegram)) {
            return 'Пользователь с таким Telegram уже существует';
        }
        return null;
    },
    
    validateEmail: function(email) {
        if (!email) {
            return 'Укажите ваш email';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Некорректный формат email';
        }
        if (Database.findUserByEmail(email)) {
            return 'Пользователь с таким email уже существует';
        }
        return null;
    },
    
    validatePassword: function(password) {
        if (!password || password.length < 6) {
            return 'Пароль должен содержать минимум 6 символов';
        }
        return null;
    },
    
    validateConfirmPassword: function(password, confirmPassword) {
        if (password !== confirmPassword) {
            return 'Пароли не совпадают';
        }
        return null;
    },
    
    validateLogin: function(username, password) {
        const user = Database.findUserByUsername(username);
        if (!user) {
            return 'Пользователь не найден';
        }
        if (!Database.validatePassword(user, password)) {
            return 'Неверный пароль';
        }
        return null;
    }
};

// Функция показа ошибки
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Функция скрытия ошибки
function hideError(element) {
    element.style.display = 'none';
}

// Функция переключения между формами
function switchForm(toForm) {
    if (toForm === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
    
    document.querySelectorAll('.error-message').forEach(error => {
        hideError(error);
    });
    
    if (toForm === 'register') {
        registerUsername.value = '';
        registerTelegram.value = '';
        registerEmail.value = '';
        registerPassword.value = '';
        registerConfirmPassword.value = '';
    } else {
        loginUsername.value = '';
        loginPassword.value = '';
    }
}

// Функция входа пользователя
function loginUser(user) {
    userData = user;
    isLoggedIn = true;
    
    // Загружаем премиум статус
    isPremiumUser = userData.isPremium || false;
    premiumAvatar = userData.premiumAvatar || '👤';
    premiumEmoji = userData.premiumEmoji || '';
    
    // Проверяем админ-права
    if (checkAdminRights(userData.username, userData.password)) {
        adminUser = userData;
        adminPanel.style.display = 'block';
    }
    
    // Остальная логика входа
    balance = userData.balance || 0;
    tapValue = userData.tap_value || 1;
    energy = userData.energy || 100;
    maxEnergy = userData.max_energy || 100;
    ownedItems = userData.owned_items || [];
    totalEarned = userData.total_earned || 0;
    totalTaps = userData.total_taps || 0;
    energyUsed = userData.energy_used || 0;
    userCrab = userData.crab || null;
    
    userSubscribed = userData.userSubscribed || false;
    subscriptionBonusClaimed = userData.subscriptionBonusClaimed || false;
    
    // Применяем эффекты купленных предметов
    ownedItems.forEach(itemId => {
        for (const category in shopItems) {
            const item = shopItems[category].find(i => i.id === itemId);
            if (item) {
                applyItemEffect(item);
                break;
            }
        }
    });
    
    Database.updateUser(userData.id, {
        last_login: new Date().toISOString()
    });
    
    updateUserInterface();
    updateBalance();
    updateEnergy();
    updateExchangeRate();
    updateMarketplace();
    updateLeaderboard();
    updateProfile();
    updateAchievements();
    updatePremiumInterface(); // Обновляем премиум интерфейс
    
    if (!userSubscribed) {
        showTelegramModal();
    }
    
    if (shopScreen.classList.contains('active')) {
        updateShopDisplay();
    }
    
    authScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    
    showNotification(`С возвращением, ${userData.username}!`);
}

// Функция сохранения данных пользователя
function saveUserData() {
    if (!userData || !isLoggedIn) return;
    
    const dataToSave = {
        balance: balance,
        tap_value: tapValue,
        energy: energy,
        max_energy: maxEnergy,
        owned_items: ownedItems,
        total_earned: totalEarned,
        total_taps: totalTaps,
        energy_used: energyUsed,
        crab: userCrab,
        last_login: new Date().toISOString(),
        userSubscribed: userSubscribed,
        subscriptionBonusClaimed: subscriptionBonusClaimed,
        telegramModalShown: userData.telegramModalShown || false,
        isPremium: isPremiumUser,
        premiumAvatar: premiumAvatar,
        premiumEmoji: premiumEmoji
    };
    
    Database.updateUser(userData.id, dataToSave);
    updateTotalCrab();
    updateLeaderboard();
    
    console.log('Данные сохранены:', dataToSave);
}

// Функция выхода пользователя
function logoutUser() {
    saveUserData();
    
    isLoggedIn = false;
    userData = null;
    userCrab = null;
    isPremiumUser = false;
    adminUser = null;
    
    authScreen.style.display = 'flex';
    gameContainer.style.display = 'none';
    adminPanel.style.display = 'none';
    
    switchForm('login');
}

// Функция обновления интерфейса пользователя
function updateUserInterface() {
    if (!userData) return;
    
    avatarPlaceholder.textContent = userData.username ? userData.username[0].toUpperCase() : 'U';
    const displayName = userData.username || 'Пользователь';
    userName.textContent = displayName;
    userId.textContent = `ID: ${userData.id || '000000'}`;
}

// Функция обновления баланса
function updateBalance() {
    balanceElement.textContent = balance.toLocaleString() + ' CRAB';
    saveUserData();
}

// Функция обновления энергии
function updateEnergy() {
    const energyPercent = (energy / maxEnergy) * 100;
    energyFillElement.style.width = energyPercent + '%';
}

// Функция показа уведомления
function showNotification(text) {
    notificationElement.textContent = text;
    notificationElement.style.opacity = '1';
    notificationElement.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        notificationElement.style.opacity = '0';
        notificationElement.style.transform = 'translateY(-20px)';
    }, 1000);
}

// Функция тапа по монете
function tapCoin(event) {
    if (energy <= 0 || !isLoggedIn) return;
    
    const rect = coinElement.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    energy -= 2;
    energyUsed += 2;
    if (energy < 0) energy = 0;
    updateEnergy();
    
    totalTaps++;
    
    let coinsEarned = tapValue;
    
    if (ownedItems.includes('crab_luck') && Math.random() < 0.1) {
        coinsEarned *= 10;
        showNotification('УДАЧА КРАБА! +' + coinsEarned + ' CRAB');
    }
    
    if (ownedItems.includes('golden_hands') && Math.random() < 0.25) {
        const bonus = tapValue;
        balance += bonus;
        totalEarned += bonus;
        updateBalance();
        showNotification('👑 ЗОЛОТЫЕ РУКИ! +' + bonus + ' CRAB');
    }
    
    balance += coinsEarned;
    totalEarned += coinsEarned;
    updateBalance();
    
    createRipple(x, y);
    createParticles(x, y, 15);
    createCrabAnimation(x, y);
    createCoinEffect();
    
    if (!ownedItems.includes('crab_luck') || Math.random() >= 0.1) {
        showNotification('+' + coinsEarned + ' CRAB');
    }
    
    coinElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        coinElement.style.transform = 'scale(1)';
    }, 100);
    
    updateProfile();
    updateAchievements();
}

// Функция восстановления энергии
function recoverEnergy() {
    if (energy < maxEnergy) {
        let recoveryAmount = energyRecoveryRate / 10;
        
        if (ownedItems.includes('energy_recovery')) {
            recoveryAmount *= 2;
        }
        
        energy += recoveryAmount;
        if (energy > maxEnergy) energy = maxEnergy;
        updateEnergy();
        
        if (Math.random() < 0.01) {
            saveUserData();
        }
    }
}

// Функция автокликера
function startAutoClicker() {
    if (autoClickerActive || !isLoggedIn) return;
    
    autoClickerActive = true;
    autoClickerInterval = setInterval(() => {
        if (energy > 0) {
            balance += tapValue;
            totalEarned += tapValue;
            updateBalance();
            
            const rect = coinElement.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            createParticles(x, y, 5);
            createCoinEffect();
            
            energy -= 0.5;
            energyUsed += 0.5;
            if (energy < 0) energy = 0;
            updateEnergy();
            
            updateProfile();
            updateAchievements();
        }
    }, 1000);
}

// Функция смены экрана
function changeScreen(screenName) {
    if (!isLoggedIn) return;
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Скрытие экранов игр
    snakeScreen.classList.remove('active');
    wheelScreen.classList.remove('active');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetTab = document.querySelector(`.tab[data-screen="${screenName}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    if (screenName === 'games') {
        gamesScreen.classList.add('active');
    } else if (screenName === 'snake') {
        snakeScreen.classList.add('active');
        initSnakeGame();
    } else if (screenName === 'wheel') {
        wheelScreen.classList.add('active');
        initWheel();
    } else if (screenName !== 'main') {
        document.getElementById(screenName + 'Screen').classList.add('active');
    }
    
    if (screenName === 'marketplace') {
        updateMarketplace();
    } else if (screenName === 'leaderboard') {
        updateLeaderboard();
    } else if (screenName === 'profile') {
        updateProfile();
        updateAchievements();
    } else if (screenName === 'shop') {
        updateShopDisplay();
    }
    
    currentScreen = screenName;
}

// Обработчики событий
coinElement.addEventListener('click', tapCoin);

profileButton.addEventListener('click', () => {
    changeScreen('profile');
});

boost1.addEventListener('click', () => {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    if (balance >= 50000) {
        balance -= 50000;
        tapValue *= 2;
        updateBalance();
        showNotification('Тап x2 активирован!');
        boost1.classList.add('disabled');
        saveUserData();
        updateProfile();
    } else {
        showNotification('Недостаточно CRAB!');
    }
});

boost2.addEventListener('click', () => {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    if (balance >= 250000) {
        balance -= 250000;
        updateBalance();
        showNotification('Автокликер активирован!');
        boost2.classList.add('disabled');
        startAutoClicker();
        saveUserData();
    } else {
        showNotification('Недостаточно CRAB!');
    }
});

boost3.addEventListener('click', () => {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    if (balance >= 500000) {
        balance -= 500000;
        tapValue *= 5;
        updateBalance();
        showNotification('x5 за тап активирован!');
        boost3.classList.add('disabled');
        saveUserData();
        updateProfile();
    } else {
        showNotification('Недостаточно CRAB!');
    }
});

boost4.addEventListener('click', () => {
    if (!isLoggedIn) {
        showNotification('Сначала войдите в аккаунт!');
        return;
    }
    
    if (balance >= 100000) {
        balance -= 100000;
        energy = Math.min(energy + 50, maxEnergy);
        updateBalance();
        updateEnergy();
        showNotification('+50 энергии!');
        saveUserData();
    } else {
        showNotification('Недостаточно CRAB!');
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const screenName = tab.getAttribute('data-screen');
        changeScreen(screenName);
    });
});

closeProfileBtn.addEventListener('click', () => changeScreen('main'));
closeShopBtn.addEventListener('click', () => changeScreen('main'));
closeGamesBtn.addEventListener('click', () => changeScreen('main'));
closeSnakeBtn.addEventListener('click', exitSnakeGame);
closeWheelBtn.addEventListener('click', exitWheel);
closeMarketplaceBtn.addEventListener('click', () => changeScreen('main'));
closeLeaderboardBtn.addEventListener('click', () => changeScreen('main'));

// Обработчики для игры Змейка
snakeUpBtn.addEventListener('click', () => {
    if (snakeDirection !== 'down') snakeDirection = 'up';
});

snakeLeftBtn.addEventListener('click', () => {
    if (snakeDirection !== 'right') snakeDirection = 'left';
});

snakeRightBtn.addEventListener('click', () => {
    if (snakeDirection !== 'left') snakeDirection = 'right';
});

snakeDownBtn.addEventListener('click', () => {
    if (snakeDirection !== 'up') snakeDirection = 'down';
});

snakeRestartBtn.addEventListener('click', restartSnakeGame);

// Обработчики для Колеса Фортуны
wheelPacks.forEach(pack => {
    pack.addEventListener('click', () => {
        wheelPacks.forEach(p => p.classList.remove('active'));
        pack.classList.add('active');
        currentSpins = parseInt(pack.getAttribute('data-spins'));
        updateWheelSpinButton();
    });
});

wheelSpinBtn.addEventListener('click', spinWheel);

// Обработчики для карточек игр
gameCards.forEach(card => {
    card.addEventListener('click', () => {
        const game = card.getAttribute('data-game');
        if (game === 'snake') {
            changeScreen('snake');
        } else if (game === 'wheel') {
            changeScreen('wheel');
        } else if (game === 'premium') {
            if (!isLoggedIn) {
                showNotification('Сначала войдите в аккаунт!');
                return;
            }
            
            if (isPremiumUser) {
                showNotification('У вас уже есть CrabPremium!');
                return;
            }
            
            premiumModal.style.display = 'flex';
        }
    });
});

// Обработчики для CrabPremium
buyPremiumBtn.addEventListener('click', buyCrabPremium);
closePremiumModal.addEventListener('click', () => {
    premiumModal.style.display = 'none';
});

// Обработчики для админ-панели
adminToggle.addEventListener('click', showAdminPanel);
closeAdmin.addEventListener('click', () => {
    adminScreen.style.display = 'none';
});

switchToRegister.addEventListener('click', () => switchForm('register'));
switchToLogin.addEventListener('click', () => switchForm('login'));

// Обработчики для модального окна Telegram
closeTelegramModal.addEventListener('click', () => {
    telegramModal.style.display = 'none';
});

verifySubscription.addEventListener('click', async () => {
    verifySubscription.disabled = true;
    verifySubscription.textContent = '🔍 Проверяем подписку...';
    
    try {
        const isSubscribed = await checkSubscription();
        
        if (isSubscribed) {
            grantSubscriptionBonus();
        } else {
            showNotification('❌ Подписка не найдена. Пожалуйста, подпишитесь на канал');
            verifySubscription.disabled = false;
            verifySubscription.textContent = '✅ Я подписался, получить бонус';
        }
    } catch (error) {
        showNotification('⚠️ Ошибка проверки подписки. Попробуйте позже');
        verifySubscription.disabled = false;
        verifySubscription.textContent = '✅ Я подписался, получить бонус';
    }
});

loginBtn.addEventListener('click', () => {
    let hasErrors = false;
    
    const username = loginUsername.value.trim();
    if (!username) {
        showError(loginUsernameError, 'Введите логин или email');
        hasErrors = true;
    } else {
        hideError(loginUsernameError);
    }
    
    const password = loginPassword.value;
    if (!password) {
        showError(loginPasswordError, 'Введите пароль');
        hasErrors = true;
    } else {
        hideError(loginPasswordError);
    }
    
    if (hasErrors) return;
    
    const loginError = Validator.validateLogin(username, password);
    if (loginError) {
        showError(loginUsernameError, loginError);
        return;
    }
    
    const user = Database.findUserByUsername(username);
    loginUser(user);
});

registerBtn.addEventListener('click', () => {
    let hasErrors = false;
    
    const username = registerUsername.value.trim();
    const usernameError = Validator.validateUsername(username);
    if (usernameError) {
        showError(registerUsernameError, usernameError);
        hasErrors = true;
    } else {
        hideError(registerUsernameError);
    }
    
    const telegram = registerTelegram.value.trim();
    const telegramError = Validator.validateTelegram(telegram);
    if (telegramError) {
        showError(registerTelegramError, telegramError);
        hasErrors = true;
    } else {
        hideError(registerTelegramError);
    }
    
    const email = registerEmail.value.trim();
    const emailError = Validator.validateEmail(email);
    if (emailError) {
        showError(registerEmailError, emailError);
        hasErrors = true;
    } else {
        hideError(registerEmailError);
    }
    
    const password = registerPassword.value;
    const passwordError = Validator.validatePassword(password);
    if (passwordError) {
        showError(registerPasswordError, passwordError);
        hasErrors = true;
    } else {
        hideError(registerPasswordError);
    }
    
    const confirmPassword = registerConfirmPassword.value;
    const confirmPasswordError = Validator.validateConfirmPassword(password, confirmPassword);
    if (confirmPasswordError) {
        showError(registerConfirmPasswordError, confirmPasswordError);
        hasErrors = true;
    } else {
        hideError(registerConfirmPasswordError);
    }
    
    if (hasErrors) return;
    
    const newUser = Database.createUser({
        username: username,
        telegram: telegram,
        email: email,
        password: password
    });
    
    loginUser(newUser);
});

logoutBtn.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
        logoutUser();
    }
});

// Инициализация
updateBalance();
updateEnergy();
updateExchangeRate();

// Восстановление энергии
setInterval(recoverEnergy, 100);

// Обновление курса каждые 10 секунд
setInterval(updateExchangeRate, 10000);

// Добавляем начальные частицы для красоты
setInterval(() => {
    if (!isLoggedIn) return;
    
    const rect = coinElement.getBoundingClientRect();
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;
    
    createParticles(x, y, 1);
}, 1000);

// Автосохранение каждые 30 секунд
setInterval(() => {
    if (isLoggedIn) {
        saveUserData();
    }
}, 30000);

// Сохраняем данные при закрытии страницы
window.addEventListener('beforeunload', () => {
    if (isLoggedIn) {
        saveUserData();
    }
});
// Добавляем в начало файла, после объявления основных переменных
let sponsorBannerClosed = false;

// Добавляем в конец файла, после всех обработчиков событий

// Элементы рекламы 1win
const sponsorBanner = document.getElementById('sponsorBanner');
const sponsorBtn = document.getElementById('sponsorBtn');
const sponsorClose = document.getElementById('sponsorClose');

// Функция показа рекламного баннера
function showSponsorBanner() {
    if (!isLoggedIn || sponsorBannerClosed) return;
    
    // Показываем баннер через 3 секунды после входа
    setTimeout(() => {
        sponsorBanner.style.display = 'block';
        
        // Автоматически скрываем через 15 секунд
        setTimeout(() => {
            if (sponsorBanner.style.display === 'block') {
                hideSponsorBanner();
            }
        }, 15000);
    }, 3000);
}

// Функция скрытия рекламного баннера
function hideSponsorBanner() {
    sponsorBanner.style.display = 'none';
    sponsorBannerClosed = true;
    
    // Сохраняем состояние в localStorage
    if (userData) {
        Database.updateUser(userData.id, {
            sponsorBannerClosed: true
        });
    }
}

// Функция отслеживания переходов по рекламе
function trackSponsorClick() {
    // Здесь можно добавить аналитику
    console.log('Пользователь перешел по рекламе 1WIN');
    
    // Награждаем пользователя за переход
    if (isLoggedIn) {
        const reward = 10000; // 10,000 CRAB за переход
        balance += reward;
        totalEarned += reward;
        updateBalance();
        showNotification(`🎉 +${reward.toLocaleString()} CRAB за переход в 1WIN!`);
        
        // Сохраняем факт перехода
        Database.updateUser(userData.id, {
            sponsorClicked: true,
            sponsorClickDate: new Date().toISOString()
        });
    }
}

// Обработчики для рекламы
sponsorBtn.addEventListener('click', trackSponsorClick);
sponsorClose.addEventListener('click', hideSponsorBanner);

// Обновляем функцию loginUser для загрузки состояния рекламы
function loginUser(user) {
    userData = user;
    isLoggedIn = true;
    
    // Загружаем состояние рекламы
    sponsorBannerClosed = userData.sponsorBannerClosed || false;
    
    // Загружаем премиум статус
    isPremiumUser = userData.isPremium || false;
    premiumAvatar = userData.premiumAvatar || '👤';
    premiumEmoji = userData.premiumEmoji || '';
    
    // Проверяем админ-права
    if (checkAdminRights(userData.username, userData.password)) {
        adminUser = userData;
        adminPanel.style.display = 'block';
    }
    
    // Остальная логика входа
    balance = userData.balance || 0;
    tapValue = userData.tap_value || 1;
    energy = userData.energy || 100;
    maxEnergy = userData.max_energy || 100;
    ownedItems = userData.owned_items || [];
    totalEarned = userData.total_earned || 0;
    totalTaps = userData.total_taps || 0;
    energyUsed = userData.energy_used || 0;
    userCrab = userData.crab || null;
    
    userSubscribed = userData.userSubscribed || false;
    subscriptionBonusClaimed = userData.subscriptionBonusClaimed || false;
    
    // Применяем эффекты купленных предметов
    ownedItems.forEach(itemId => {
        for (const category in shopItems) {
            const item = shopItems[category].find(i => i.id === itemId);
            if (item) {
                applyItemEffect(item);
                break;
            }
        }
    });
    
    Database.updateUser(userData.id, {
        last_login: new Date().toISOString()
    });
    
    updateUserInterface();
    updateBalance();
    updateEnergy();
    updateExchangeRate();
    updateMarketplace();
    updateLeaderboard();
    updateProfile();
    updateAchievements();
    updatePremiumInterface(); // Обновляем премиум интерфейс
    
    // Показываем рекламный баннер
    if (!sponsorBannerClosed) {
        showSponsorBanner();
    }
    
    if (!userSubscribed) {
        showTelegramModal();
    }
    
    if (shopScreen.classList.contains('active')) {
        updateShopDisplay();
    }
    
    authScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    
    showNotification(`С возвращением, ${userData.username}!`);
}

// Обновляем функцию saveUserData для сохранения состояния рекламы
function saveUserData() {
    if (!userData || !isLoggedIn) return;
    
    const dataToSave = {
        balance: balance,
        tap_value: tapValue,
        energy: energy,
        max_energy: maxEnergy,
        owned_items: ownedItems,
        total_earned: totalEarned,
        total_taps: totalTaps,
        energy_used: energyUsed,
        crab: userCrab,
        last_login: new Date().toISOString(),
        userSubscribed: userSubscribed,
        subscriptionBonusClaimed: subscriptionBonusClaimed,
        telegramModalShown: userData.telegramModalShown || false,
        isPremium: isPremiumUser,
        premiumAvatar: premiumAvatar,
        premiumEmoji: premiumEmoji,
        sponsorBannerClosed: sponsorBannerClosed,
        sponsorClicked: userData.sponsorClicked || false,
        sponsorClickDate: userData.sponsorClickDate || null
    };
    
    Database.updateUser(userData.id, dataToSave);
    updateTotalCrab();
    updateLeaderboard();
    
    console.log('Данные сохранены:', dataToSave);
}

// Добавляем функцию для случайного показа рекламы
function showRandomSponsorAd() {
    if (!isLoggedIn || sponsorBannerClosed) return;
    
    // Случайный шанс показа рекламы (10%)
    if (Math.random() < 0.1) {
        showSponsorBanner();
    }
}

// Запускаем случайные показы рекламы каждые 5 минут
setInterval(() => {
    if (isLoggedIn) {
        showRandomSponsorAd();
    }
}, 300000); // 5 минут

// Обновляем Database.createUser для добавления полей рекламы
// В функции createUser добавляем:
const newUser = {
    // ... существующие поля ...
    sponsorBannerClosed: false,
    sponsorClicked: false,
    sponsorClickDate: null
};