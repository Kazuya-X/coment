/*-------------------*/
// HAYO MAU NGAPAIN?
/* -------------------*/
// Module Or Library
const readline = require("readline");
const axios = require("axios");
const cheerio = require("cheerio");
const ryochan = require("fs/promises")
const { spawn } = require('child_process');
// Warna
const R	= "\x1b[31m" // Red
const G	= "\x1b[32m" // Green
const Y	= "\x1b[33m" // Yellow
const B	= "\x1b[34m" // Blue
const M	= "\x1b[35m" // Magenta
const C	= "\x1b[36m" // Cyan
const W	= "\x1b[37m" // White
const qoqop = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function sleep(tm) {return new Promise(resolve =>setTimeout(resolve, tm));}
function Input(argument) {return new Promise(resolve => {
		qoqop.question(argument, resolve);
	});}/*clear-->*/async function clear() 
{const ryosan = await spawn('clear', [], { stdio: 'inherit' });ryosan.on('error', (error) => {console.error(`Error: ${error}`); });
  ryosan.on('exit', (code) => {
    if (code !== 0) {console.error(`Clear command exited with code ${code}`);}});}
function clear1() {process.stdout.write('\x1B[2J\x1B[0f')
}
const banner = async () => {await clear1();
console.log(` ${G}  __________  __  _____  __________   ________
  / ____/ __ \/  |/  /  |/  / ____/ | / /_  __/
 / /   / / / / /|_/ / /|_/ / __/ /  |/ / / /   
/ /___/ /_/ / /  / / /  / / /___/ /|  / / /    
\____/\____/_/  /_/_/  /_/_____/_/ |_/ /_/ By:Kazuya    
                                               `)
}
// Menu Utama
const menu = async () => {const user_zuya = await login();
	await banner();
	console.log(`Yo, ${G}${user_zuya[0]}${W}`)
	console.log(`Email : ${G}${user_zuya[1]}${W}`)
	console.log(`Phone : ${G}${user_zuya[2]}${W}`)
	console.log('-'.repeat(32))
	console.log(`Menu Tools : `)
	console.log(`${W}1.Bot Comment Target ${G} `)
	console.log(`${W}2. Bot Comment Massal ${G} `)
	console.log(`${W}3. Remove cookie `)
	const zuya = await Input('Pilih : ');
	if (zuya == "1") {await commentTarget();}
	if (zuya == "2") {
		await setCommentMasal();}
	if (zuya == "3") {
    await ryochan.unlink('Data/.cookie.txt');process.exit();
	}
	qoqop.close();}


// Funtion Get Token Eaat
async function login() {
	let cookies
	try {
		cookies = await ryochan.readFile('Data/.cookie.txt')
	} catch {
		cookies = await Input('Input Cookie : ');
		await ryochan.mkdir('Data', { recursive: true })
		await ryochan.writeFile('Data/.cookie.txt', cookies)
	}

	try {
		const get = await axios.get('https://mbasic.facebook.com/settings/account/?', {
			headers: {
				'Cookie': cookies
			}
		});

		const data = get.data;
		if (data.includes("login_error")) {	console.error(`${R}Cookie Invalid !${W}`);await ryochan.unlink('Data/.cookie.txt');
			process.exit();}

		const user_zuya = [];const response = cheerio.load(get.data);const tbody = response('div[id="root"]');
		tbody.find('table').each((index, element) => {
			const table = response(element);
			const value = table.find('span:first').text()
			user_zuya.push(value);
		});

		return [user_zuya[0], user_zuya[1], user_zuya[2]]

	} catch (error) {
		console.log(`${R}Login Failled${W}`)
		await ryochan.unlink('Data/.cookie.txt');
		process.exit();
	}
}// Function Comment Target
async function commentTarget() {
	console.log('—'.repeat(25));
	let textComment; let url; let jumlah
	jumlah = await Input('Input Jumlah Commen : ');
	textComment = await Input('Input Text Commet : ');
	url = await Input('Input Url Post : ');
	console.log('—'.repeat(25));

	for (i = 1; i <= parseInt(jumlah); i++) {
		process.stdout.write(`\rRunning ${G}${i}${W}/${Y}${jumlah}${W} ... `);
		try {
			cookies = await ryochan.readFile('Data/.cookie.txt')
			const get = await axios.get(url, {
				headers: {
					"Host": "mbasic.facebook.com",
		            "cache-control": "max-age\u003d0",
		            "dpr": "1.600000023841858",
		            "viewport-width": "980",
		            "sec-ch-ua": "\"Chromium\";v\u003d\"118\", \"Google Chrome\";v\u003d\"118\", \"Not\u003dA?Brand\";v\u003d\"99\"",
		            "sec-ch-ua-mobile": "?1",
		            "sec-ch-ua-platform": "\"Android\"",
		            "sec-ch-ua-platform-version": "\"13.0.0\"",
		            "sec-ch-ua-model": "\"SM-A037F\"",
		            "sec-ch-ua-full-version-list": "\"Chromium\";v\u003d\"118.0.5993.112\", \"Google Chrome\";v\u003d\"118.0.5993.112\", \"Not\u003dA?Brand\";v\u003d\"99.0.0.0\"",
		            "sec-ch-prefers-color-scheme": "light",
		            "upgrade-insecure-requests": "1",
		            "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36",
		            "accept": "text/html,application/xhtml+xml,application/xml;q\u003d0.9,image/avif,image/webp,image/apng,*/*;q\u003d0.8,application/signed-exchange;v\u003db3;q\u003d0.7",
		            "sec-fetch-site": "none",
		            "sec-fetch-mode": "navigate",
		            "sec-fetch-user": "?1",
		            "sec-fetch-dest": "document",
		            "accept-encoding": "gzip, deflate",
		            "accept-language": "id-ID,id;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7",
		            "cookie": cookies
				}
			});
			
			const response = cheerio.load(get.data);
			const form = response('form[method="post"]');
			const jazoest = form.find('input[name="jazoest"]').attr('value');
			const fbDtsg = form.find('input[name="fb_dtsg"]').attr('value');
			const urlPost = "https://mbasic.facebook.com" + form.attr('action');
			const data = {
				'fb_dtsg': fbDtsg,
				'jazoest': jazoest,
				'comment_text': textComment,
			}

			try {
				const posting = await axios.post(urlPost, data, {
					headers:  {
			            "content-type": "application/x-www-form-urlencoded",
						"cookie": cookies,
					}
				})
				if (posting.statusText === "OK") process.stdout.write(`\r${G}Succes Send Comment${W}\n`);

			} catch {
				process.stdout.write(`\r${R}Failled Send Comment${W}\n`);

			}

		} catch {
			process.stdout.write(`\r${R}Failled Get Post${W}\n`);

		}

	if (i+1 <= parseInt(jumlah)) {
		process.stdout.write(`\rRunning ${G}${i+1}${W}/${Y}${jumlah}${W} ... `)
		await sleep(10000);
	} else {
		qoqop.close()
	}
}
}

// Function Set Comment Masal
async function setCommentMasal() {
	console.log('—'.repeat(25));
	let inputText; let textComment = [];
	console.log(`Gunakan [ ${G}|${W} ] sebagai pemisah untuk random text`);
	inputText = await Input('Input Text Commen : ');
	console.log('—'.repeat(25));

	if (inputText.includes('|')) {
		for (x of inputText.split('|')) {
			textComment.push(x);
		}
	} else {
		textComment.push(inputText);
	}

	const url = 'https://mbasic.facebook.com/home.php?'
	commentMasal(url, textComment);
}


// Function Comment Masal
async function commentMasal(url, textComment) {
	try {
		const cookies = await ryochan.readFile('Data/.cookie.txt');
		const get = await axios.get(url, { 
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				'Cookie': cookies
			}
		});

		const response = cheerio.load(get.data);
		const section = response('div[id="objects_container"]');

		const commentPromises = [];
		for (ress of section.find('div.cy')) {
			let name; let urlPost;
			const tbody = response(ress);
			const strong = tbody.find('table');
			name = strong.find('strong:first').text();

			for (res of tbody.find('a')) {
				const element_a = response(res);
				const text = element_a.text();
				if (text.includes('omment') || text.includes('omentar')) {
					const urls = element_a.attr('href');
					if (urls.includes('mbasic')) {
						urlPost = element_a.attr('href');
					} else {
						urlPost = 'https://mbasic.facebook.com' + urls;
					}
				}
			};

			if (name && urlPost) {
				commentPromises.push(sendCommentWithDelay(urlPost, name, textComment, 30000 * commentPromises.length));
			}
		};

		await Promise.all(commentPromises);

		let links;
		for (aLink of section.find('a')) {
			const url_a = response(aLink);
			const textLink = url_a.text();
			if (textLink.includes('See more stories') || textLink.includes('Lihat Berita Lain')) {
				links = 'https://mbasic.facebook.com' + url_a.attr('href');
				commentMasal(links, textComment);
			}
		}


	} catch (error) {
		console.log(error);
	}
}


// Function Send Comment with Delay
async function sendCommentWithDelay(url, name, textComment, delay) {
  await new Promise(resolve => setTimeout(resolve, delay));
  await sendComment(url, name, textComment);
}


// Function Send Comment
async function sendComment(url, name, textComment) {
	try {
		const kirim = textComment[ Math.floor( Math.random() * textComment.length ) ];
		const cookies = await ryochan.readFile('Data/.cookie.txt');
		const get = await axios.get(url, {
			headers: {
				'Cookie': cookies
			}
		});

		const response = cheerio.load(get.data);
		const form = response('form[method="post"]');
		const jazoest = form.find('input[name="jazoest"]').attr('value');
		const fbDtsg = form.find('input[name="fb_dtsg"]').attr('value');
		const urlPost = "https://mbasic.facebook.com" + form.attr('action');
		const data = {
			'fb_dtsg': fbDtsg,
			'jazoest': jazoest,
			'comment_text': kirim,
		}
		try {
			const post = await axios.post(urlPost, data, {
				headers:  {
		            "content-type": "application/x-www-form-urlencoded",
					"cookie": cookies,
				}
			})
			if (post.statusText === "OK") {
				process.stdout.write(`\r${G}Succes${W}\n`);
				process.stdout.write(`\rName : ${G}${name}${W}\n`);
				process.stdout.write(`\rText : ${G}${kirim}${W}\n`);
				console.log('—'.repeat(25));
			};

		} catch {
			process.stdout.write(`\r${R}Failled Send Comment${W}\n`);
			console.log('—'.repeat(25));

		};

	} catch (error) {
		console.log(error);
	}
}




async function main() {await clear()
  await menu()
}


main()