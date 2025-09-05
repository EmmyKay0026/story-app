import { Story } from "@/types/stories";

// lib/constants.ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://story-app-chi.vercel.app";

// Demo data for development purposes only!
// export const mockUser: User = {
//   id: "string",
//   phoneNumber: "234567890456789",
//   points: 60,
//   preferences: {
//     theme: "light",
//     fontSize: "small",
//   },
//   progress: [
//     {
//       story_id: "1",
//       episode_id: "1-1",
//       progress: 60,
//       lastReadAt: new Date("2023-10-01T12:00:00Z"),
//       isCompleted: false,
//     },
//   ],
//   bookmarks: ["2"],
//   unlockedEpisodes: ["1-2", "1-3"], // episode IDs
// };
// export const CATEGORIES = [
//   "Romance",
//   "Mystery",
//   "Sci-Fi",
//   "Fantasy",
//   "Thriller",
//   "Drama",
//   "Adventure",
// ];

// export const ALLCATEGORIES = [
//   { label: "Romance", value: "romance" },
//   { label: "Mystery", value: "mystery" },
//   { label: "Sci-Fi", value: "sci-fi" },
//   { label: "Fantasy", value: "fantasy" },
//   { label: "Thriller", value: "thriller" },
//   { label: "Drama", value: "drama" },
//   { label: "Adventure", value: "adventure" },
//   { label: "Post-apocalyptic", value: "post-apocalyptic" },
//   { label: "Enemies to lovers", value: "enemies-to-lovers" },
//   { label: "Small town", value: "small-town" },
// ];

export const mockStories: Story[] = [
  {
    id: "1",
    title: "The Last City",
    description:
      "In a world where civilization has crumbled, one city remains standing. Follow Maya as she uncovers the dark secrets that keep her home alive.",
    author: "Elena Rodriguez",
    coverImage:
      "https://img.freepik.com/free-psd/world-book-day-template-design_23-2150195598.jpg",
    category: { id: "1 ", label: "Sci-Fi", value: "sci-fi" },
    tags: ["Post-apocalyptic", "Sci-Fi", "Mystery"],
    rating: 4.8,
    totalEpisodes: 5,
    totalReadTime: 45,
    isFeatured: false,
    episodes: [
      {
        id: "1-1",
        title: "The Wall",
        content: `Maya pressed her hand against the cold metal of the Wall, feeling the subtle vibrations that ran through it day and night. For twenty-three years, this barrier had protected New Eden from the wasteland beyond, but she had never questioned what powered it.

"Maya!" Her friend Zara called from across the plaza. "You're late for work again."

She pulled her hand away reluctantly. The tingling sensation always lingered for a few moments after touching the Wall. Her grandmother used to tell stories about the time before—when there were many cities, when people could travel freely between them. But those were just stories.

As she hurried to catch up with Zara, Maya didn't notice the small crack that had appeared where her hand had been. Inside the Wall, something ancient stirred.

The Council had always taught them that they were the last survivors of humanity, that everything beyond the Wall was dead and poisoned. But lately, Maya had been hearing sounds in the night—sounds that seemed to come from the other side.

She worked at the Energy Core, one of the few places where citizens were allowed to go deep underground. It was there, three levels below the surface, that she first saw the blue light seeping through the foundation stones. The same blue light that pulsed in the Wall.

Her supervisor, Dr. Chen, had been nervous all week. He kept glancing at the readings and muttering under his breath. When Maya asked what was wrong, he just shook his head.

"The balance is shifting," he finally whispered when they were alone. "The Wall... it's not what they tell us it is."

That night, Maya couldn't sleep. She found herself drawn back to the plaza, to the Wall that had always been the boundary of her world. Under the moonlight, she could see that the crack had grown larger.

As she approached, she heard it clearly for the first time—voices on the other side. Human voices.`,
        isPremium: false,
        pointsCost: 0,
        readTime: 8,
        order: 1,
      },
      {
        id: "1-2",
        title: "Beyond the Barrier",
        content: `The voices grew stronger as Maya pressed her ear to the crack. She could make out words now, fragments of conversation that made her heart race.

"...the harvest is failing..." "...they don't know..." "...how much longer can we maintain..."

She pulled back, gasping. The Wall wasn't keeping something out—it was keeping them in.

Over the next few days, Maya found herself making excuses to work late shifts. Dr. Chen was growing more agitated, and she overheard him arguing with Council members about "energy depletion" and "unsustainable extraction."

It was during one of these late nights that she discovered the truth. While running a routine check in the deepest level of the facility, she found a hidden room behind a maintenance panel. Inside, ancient computers hummed with data streams she'd never seen before.

The screens showed the outside world—not the barren wasteland she'd been taught about, but green fields and flowing rivers. Cities in the distance, very much alive. And most shocking of all, New Eden itself from the outside perspective—not a sanctuary, but a prison.

A soft footstep behind her made her spin around. Dr. Chen stood in the doorway, his face grave.

"I was wondering when you'd find this place," he said quietly. "Your grandmother used to work here, you know. Before the Council decided the truth was too dangerous."

Maya stared at him. "My grandmother?"

"She was one of the engineers who built the Wall. But not to keep danger out, Maya. To keep us from leaving. The Council made a deal with the Outside Territories fifty years ago. New Eden provides energy—human bioelectric energy—in exchange for protection and resources."

The room seemed to spin. "Human energy?"

Dr. Chen nodded grimly. "Every citizen of New Eden is connected to the Wall through those daily 'health scans' we all take. We're batteries, Maya. And the Wall is starting to fail because we're running out of people."

Through the crack in the Wall, the voices outside were getting louder. They were counting down to something. Maya realized with growing horror that it wasn't voices calling for help—it was voices preparing for harvest.`,
        isPremium: true,
        pointsCost: 8,
        readTime: 9,
        order: 2,
      },
      {
        id: "1-3",
        title: "The Resistance",
        content: `Maya spent the night poring over the hidden files with Dr. Chen. The truth was worse than she'd imagined. New Eden wasn't just a battery farm—it was an experiment. The Outside Territories were testing how much energy they could extract from a contained human population before it collapsed entirely.

"There are others who know," Dr. Chen explained, pulling up a secure communication system. "Your grandmother left us a network. We call ourselves the Awakened."

Names and faces appeared on the screen—people Maya recognized from around the city, all living double lives. The baker who always smiled too knowingly. The librarian who kept books the Council said were lost. The maintenance worker who hummed songs that didn't exist in their approved cultural database.

"We've been preparing for this moment," Dr. Chen continued. "The Wall is failing not just because of energy depletion, but because we've been sabotaging it. Carefully, slowly, for twenty years."

Maya's mind reeled. "But the people outside—they're coming to harvest us!"

"No, Maya. They're coming to rescue us. The voices you heard? They're the Territories' resistance movement. Not everyone Outside agreed with the Council's deal. They've been working to expose the truth and shut down the farms."

A soft alarm began beeping. Dr. Chen's face went pale as he checked the monitors.

"The Council knows we're here. Someone must have detected the breach in the Wall." He started frantically copying files to a portable device. "Maya, you have a choice to make. You can return to the surface, pretend this never happened, and live out your days as a battery. Or you can help us free everyone."

Through the speakers, they could hear security forces mobilizing above. Maya thought of everyone she knew—Zara, her neighbors, the children in the education centers who had never seen a real sunset.

"What do I need to do?"

Dr. Chen smiled, and for the first time, he looked hopeful. "We need to bring down the Wall completely. Tonight. Before the Council can implement their Emergency Protocol."

"What's Emergency Protocol?"

"When a farm becomes unprofitable, they eliminate the population and start over somewhere else. We have maybe six hours before they flood the city with neural gas."

Maya's hands trembled as she took the device from him. "How do we bring down something that's kept us prisoner for fifty years?"

"With the same energy that built it. Every citizen's bioelectric signature is registered in the Wall's core. If we can reverse the flow—turn us from batteries into overloaders—the whole system will collapse."

The sound of footsteps echoed from the corridor above. Dr. Chen activated a hidden exit.

"There are three other Awakened at key positions throughout the city. You need to reach them and coordinate the overload. Maya—your grandmother died trying to do this. Don't let her sacrifice be in vain."`,
        isPremium: true,
        pointsCost: 10,
        readTime: 10,
        order: 3,
      },
      {
        id: "1-4",
        title: "The Breaking Point",
        content: `Maya emerged from the underground through a hidden passage in the old cemetery, her heart pounding as searchlights swept the streets above. The city felt different now that she knew the truth—every building, every street corner was part of an elaborate cage.

Using Dr. Chen's device, she made contact with the first Awakened member: Sara Kim, who worked at the Central Processing Hub where all citizens' bioelectric data was monitored.

"Maya? Thank god," Sara's voice crackled through the secure channel. "The Council's mobilizing everything. They're telling people there's been a terrorist attack, that everyone needs to report to emergency gathering points for 'safety scans.'"

"That's the neural gas deployment," Maya realized. "We need to move now."

She ran through the empty streets, avoiding the security patrols. The second Awakened member, Marcus Webb, was stationed at the North Energy Relay. When she reached his position, she found him already working frantically at a control panel.

"I can reverse the flow from here," he said without looking up, "but I need the other stations to coordinate the timing. If we're off by even a few seconds, the backlash will kill half the city before the Wall comes down."

Maya's communicator buzzed with an emergency message from the third member, Elena Torres at the South Relay. "Council forces are storming my position. I can hold them for maybe ten minutes, but—"

The transmission cut to static.

"We have to go now," Marcus said grimly. "Elena was going to handle the final synchronization, but you'll have to do it from the Core."

Maya looked at the device in her hands. "I don't know how—"

"Your grandmother's access codes are in there. The Wall recognizes genetic markers from the original builders. Maya, you might be the only person in the city who can actually interface directly with the system."

Through the windows, they could see citizens being herded toward the gathering points by security forces. Many were already looking drowsy—the neural gas was being released in small doses to make people compliant.

Maya sprinted back toward the Energy Core, dodging patrols and using maintenance tunnels her new knowledge had revealed. When she reached the deepest level, she found Dr. Chen's body. He'd held the security forces off as long as he could.

With tears in her eyes, she connected the device to the central console. The Wall's core system was massive—a pulsing network of energy conduits that fed off the life force of every person in New Eden. She could see the bioelectric signatures of her friends, her neighbors, everyone she'd ever known, all slowly being drained.

The interface recognized her genetic signature. Suddenly, her grandmother's voice filled the room—a pre-recorded message triggered by Maya's access.

"If you're hearing this, Maya, then the time has finally come. I'm sorry we couldn't free them in my lifetime. The override sequence is in your DNA—the Wall will respond to your direct touch. But Maya, listen carefully: when you reverse the flow, you'll be channeling the combined life force of forty thousand people through yourself. You might not survive it."

Maya placed her hands on the core interface. She could feel the Wall's power, the weight of all those lives. Outside, she could hear the voices from beyond growing louder—the rescue teams were ready.

"I love you, grandmother," she whispered, and pushed all her energy into the system.

The Wall began to crack, loudly and violently. Throughout New Eden, every citizen suddenly felt a surge of vitality they hadn't experienced in years as their stolen energy returned to them. The gathering points erupted in confusion as people shook off the neural gas effects and realized what was happening.

Maya collapsed as the Wall's death throes shook the entire city, but she was smiling. Through the widening cracks, she could see the first rays of actual sunlight New Eden had seen in fifty years.`,
        isPremium: true,
        pointsCost: 12,
        readTime: 12,
        order: 4,
      },
      {
        id: "1-5",
        title: "New Dawn",
        content: `Maya woke up in a medical tent outside the ruins of the Wall, her body weak but alive. The first face she saw was Zara's, tears streaming down her cheeks.

"You did it," Zara whispered. "You actually did it."

Beyond the tent flaps, Maya could see a world she'd never imagined. Rolling hills stretched to the horizon under an endless blue sky. Citizens of New Eden were wandering around in amazement, many seeing natural sunlight for the first time in their lives.

Dr. Patricia Voss, a representative from the Outside Territories, sat down beside Maya's bed. "The energy farms have been shut down across twelve regions. Your city was one of the last, and definitely the most heavily fortified. What you did here—it's going to save thousands of lives."

"What happens now?" Maya asked weakly.

"Now you rebuild. The Territories are providing resources and medical aid, but New Eden—or whatever you choose to call yourselves now—will be independent. No more Councils, no more energy extraction. You're free."

Over the following weeks, Maya learned about the world beyond the Wall. The Territories weren't a single government but a loose alliance of free cities, each developing their own sustainable technologies. The energy farms had been a conspiracy by a corporate faction that had been overthrown years ago—but they'd hidden the farms' existence from the mainstream Territory leadership.

Maya found herself appointed as a liaison between her people and the outside world, helping to coordinate the massive transition. It wasn't easy—many citizens struggled with agoraphobia after a lifetime of confinement, and there were heated debates about whether to rebuild on the same spot or relocate entirely.

But there were miracles too. Children laughed as they ran through grass for the first time. Elderly citizens who had been born before the Wall shared suppressed memories of the outside world. Artists created works inspired by horizons they'd never seen.

Six months later, Maya stood where the Wall's main gate had been, now just a pile of twisted metal and crystal. The settlement they'd built was smaller than New Eden but infinitely more alive. Gardens flourished where energy conduits once ran. Children played games that would have been impossible in the confined city.

Zara approached, carrying a tablet with architectural plans. "The Council's old headquarters—we're converting it into a school. And Maya, we want to name it after your grandmother."

Maya smiled, watching the sunset paint the sky in colors that no Wall could ever contain. "She'd like that."

In the distance, other settlements were visible—former energy farms that had also been liberated, now growing into vibrant communities. The horizon no longer meant the end of the world, but the beginning of infinite possibilities.

Maya pulled out her communicator and started recording a message for other farms that might still be operating in hidden corners of the world:

"This is Maya Chen of Free Eden, broadcasting on the liberation frequency. If you're listening to this from behind a Wall, know that there is a world beyond it waiting for you. And know that you are not alone. The barriers they built to contain us have become the bridges we'll use to find each other."

She sent the message out into the vast, open world, and for the first time in her life, truly felt free.`,
        isPremium: true,
        pointsCost: 8,
        readTime: 11,
        order: 5,
      },
    ],
  },
  {
    id: "2",
    title: "Shadows of the Heart",
    description:
      "When corporate lawyer Sarah meets mysterious bookstore owner Alex, she discovers that some love stories are worth fighting the whole world for.",
    author: "Maria Santos",
    coverImage:
      "https://img.freepik.com/free-photo/open-book-concept-fairy-tale-fiction-storytelling_23-2150793737.jpg",
    category: { id: "1 ", label: "Sci-Fi", value: "sci-fi" },
    tags: ["Romance", "Enemies to lovers", "Small town"],
    rating: 4.6,
    totalEpisodes: 4,
    totalReadTime: 32,
    isFeatured: true,
    episodes: [
      {
        id: "2-1",
        title: "Collision Course",
        content: `Sarah Mitchell had exactly forty-seven minutes to catch her train back to the city when she collided with the most infuriating man she'd ever met.

"Watch it!" she snapped, papers scattering from her briefcase across the sidewalk.

The stranger—tall, dark-haired, with paint-stained fingers—just smiled infuriatingly as he helped gather her documents. "Sorry about that. You seemed like you were in a hurry to escape our little town."

"I am," Sarah said curtly, snatching the papers from his hands. She was here on business—her law firm was handling the acquisition of prime downtown real estate for a major development project. Get in, get signatures, get out. That was the plan.

"Sarah Mitchell, Corporate Development Attorney," the man read from one of her business cards before handing it back. "I'm Alex Rivera. I own that little bookstore you're probably planning to tear down."

Sarah's stomach dropped. This was the holdout property owner her firm had been trying to reach for weeks. The charming bookstore directly in the center of their development zone—and its stubborn owner who refused to return their calls.

"Mr. Rivera. I've been trying to reach you."

"I know." His smile didn't reach his eyes. "I've been avoiding you."

Sarah checked her watch. Forty-three minutes. "Look, I understand you're attached to your business, but our offer is extremely generous. You could open a new bookstore anywhere with what we're offering."

"Could I?" Alex gestured to the building behind him—a century-old brick structure with ivy climbing its walls and a hand-painted sign that read 'Rivera's Books & Coffee.' "Could I recreate the corner where Mrs. Henderson met her husband sixty years ago? Or the reading nook where three generations of the Patterson family learned to love books?"

"Mr. Rivera, I appreciate the sentiment, but—"

"But sentiment doesn't pay corporate bonuses." Alex's voice was calm, but Sarah caught the edge underneath. "Ms. Mitchell, that train you're rushing to catch? It'll still be running tomorrow. Maybe you should stick around and see what you're so eager to destroy."

Sarah's phone buzzed with a text from her boss: Deal closed yet? Board meeting moved to Monday. Need this wrapped up.

"I can't," she said, already walking away. "I have a job to do."

"So do I," Alex called after her. "And mine involves protecting this place."

Sarah made her train with thirty seconds to spare, but as the small town disappeared behind her, she couldn't stop thinking about paint-stained fingers and eyes that seemed to see right through her professional armor. This was just business, she told herself. It always was.

But that night, she found herself researching Rivera's Books & Coffee online, scrolling through photos of cozy reading corners, community events, and hundreds of five-star reviews from locals talking about how the store had changed their lives.

For the first time in her career, Sarah Mitchell fell asleep wondering if maybe, just maybe, she was on the wrong side of a deal.`,
        isPremium: false,
        pointsCost: 0,
        readTime: 8,
        order: 1,
      },
      {
        id: "2-2",
        title: "Terms of Engagement",
        content: `Sarah's boss was not pleased.

"What do you mean he won't negotiate?" Richard Blackwood's voice carried across the conference room like a knife. "Everyone has a price, Mitchell. Find his."

Sarah stared at the legal documents spread across the mahogany table—contracts, property assessments, acquisition agreements. All perfectly legal, all designed to clear the way for Blackwood Development's newest luxury complex. All currently useless thanks to one stubborn bookstore owner.

"I've made three offers, sir. Each one above market value. He's not interested in money."

"Then find out what he is interested in. You're going back to Millbrook tomorrow."

Sarah's heart did something complicated at the thought of seeing Alex Rivera again. She'd been trying not to think about their encounter for three days, but his words kept echoing in her head: 'See what you're so eager to destroy.'

The next morning found her standing outside Rivera's Books & Coffee at opening time, armed with a new strategy and a cardboard tray holding two coffee cups.

Alex looked up from arranging a window display of local authors when she knocked. His surprise was quickly replaced by wariness.

"Ms. Mitchell. Back so soon?"

"I brought coffee. A peace offering."

He opened the door, and she stepped into what felt like another world. Morning sunlight streamed through tall windows, illuminating shelves that stretched from floor to ceiling. The smell of coffee beans mixed with old paper and something else—something that felt like home.

"This is beautiful," she said, and meant it.

"My grandmother opened this place in 1952," Alex said, accepting the coffee. "She survived the Depression, two wars, and a dozen economic downturns. This store was her life's work."

"Was?"

"She passed five years ago. Left me the store and a promise to never let it become another corporate casualty." Alex gestured to a wall of framed photos—decades of community events, book clubs, children's story times. "These people aren't just customers, Ms. Mitchell. They're family."

Sarah found herself studying the photos, seeing the same faces at different ages, different events. Children who grew up into teenagers, teenagers who became parents, bringing their own children to story time. A community built around books and connection.

"Sarah," she said softly.

"What?"

"My name is Sarah. Not Ms. Mitchell."

Alex smiled, and this time it reached his eyes. "Sarah. Would you like the tour?"

For the next hour, Sarah forgot she was supposed to be conducting business. Alex showed her the rare books collection his grandmother had carefully curated, the children's section with its hand-painted murals, the cozy café area where locals gathered every morning to solve the world's problems over espresso.

But it was the community bulletin board that stopped her cold. Dozens of thank-you notes, photos, and testimonials covered every inch. "This place saved my marriage." "Found my best friend in your book club." "Thank you for giving my daughter a safe place to read when home wasn't safe."

"My development will bring jobs," Sarah said quietly, but the words felt hollow. "Economic growth. Progress."

"Whose definition of progress?" Alex asked. "The board members who'll never live here? The investors who see this town as a profit margin?"

Sarah's phone buzzed. Another text from Richard: Board meeting tomorrow at 9. Better have good news.

"I have to make this deal happen," Sarah said, more to herself than to Alex. "My career depends on it."

"And if your career depends on destroying what matters to other people, what does that say about your career?"

The question hit like a physical blow. Sarah had worked for twelve years to make senior associate at Blackwood Development. She'd sacrificed relationships, friendships, and countless nights and weekends. She'd told herself it was all worth it, that success justified everything.

But standing in this store, surrounded by evidence of a different kind of success—the kind measured in community bonds and changed lives—she wasn't sure anymore.

"I should go," she said.

Alex walked her to the door. "Sarah? That offer you made—what happens if I don't accept it?"

Sarah met his eyes. "Eminent domain. The city council will declare this area blighted and force the sale."

"Even though it's not blighted?"

"Even though it's not blighted."

Alex nodded grimly. "Then I guess we both have decisions to make."

As Sarah walked back to her rental car, she realized she wasn't just fighting for a development deal anymore. She was fighting for the right to look at herself in the mirror, and she wasn't sure which side of this battle would let her do that.`,
        isPremium: false,
        pointsCost: 0,
        readTime: 9,
        order: 2,
      },
      {
        id: "2-3",
        title: "Changing Pages",
        content: `Sarah didn't go back to the city that night. Instead, she found herself in Millbrook's only hotel—a charming bed & breakfast run by an elderly couple who seemed delighted to have a guest.

"Most folks just pass through on their way somewhere else," Mrs. Patterson explained over breakfast. "It's nice to have someone who wants to stay awhile."

But Sarah wasn't staying for leisure. She was staying because she'd spent half the night reading about eminent domain cases, looking for loopholes, precedents, anything that might help her understand her options. What she'd found kept her awake until dawn.

Her phone rang as she was finishing her coffee. Richard Blackwood's name flashed on the screen.

"Mitchell, I've been thinking. If this bookstore owner won't sell, we'll expedite the eminent domain process. I've got connections on the city council."

"Sir, that could take months to fight in court—"

"Not if we don't give them time to fight. Emergency session tonight. Development declared essential for economic recovery. Very clean, very fast."

Sarah felt sick. "Is that legal?"

"It's business, Mitchell. And if you want to make partner next year, you'll make sure this goes smoothly."

After hanging up, Sarah sat staring at her phone. Partner. Everything she'd worked for. And all she had to do was let Alex Rivera get steamrolled by a process he wouldn't see coming until it was too late.

She walked downtown, ostensibly to scout locations for the development but really because she needed to see the bookstore again. To remind herself why this was just business.

Instead, she found Alex in the children's section, reading to a group of kindergarteners. His voice brought the story to life, and the children hung on every word. When he finished, they erupted in applause and demands for "one more!"

"Maybe next week," Alex said, grinning. "But first, who wants to pick out a book to take home?"

Sarah watched him help each child find something perfect—adventure for the boy who loved dinosaurs, a fairy tale for the girl who wanted to be a princess, a book about friendship for the shy child who always sat in the back.

"Ms. Sarah!" One of the children had spotted her. "Are you here for story time too?"

"I..." Sarah looked at Alex, who was watching her with an expression she couldn't read. "I was just browsing."

"Alex reads the best stories," the little girl confided. "And he always has the perfect book for everyone. What kind of stories do you like?"

"I don't really read stories," Sarah admitted. "Mostly legal briefs and contracts."

The child looked horrified. "That sounds very boring."

"It is," Sarah said, surprising herself with her honesty.

After the children left with their parents and their new books, Alex approached her. "So, what's the verdict? Found a good spot for the wrecking ball?"

Sarah's throat felt tight. "Alex, I need to tell you something. The city council is meeting tonight. Emergency session."

His face went very still. "Eminent domain?"

She nodded. "You'll get notice tomorrow, but the process will move fast. Days, not weeks."

"Why are you telling me this?"

Sarah looked around the store—at the community bulletin board, at the reading nook where generations had learned to love books, at the corner where Mrs. Henderson had met her husband. "Because this place matters. And because I'm not sure I want to be the person who destroys it."

"Sarah..." Alex stepped closer. "You could stop this. You know that, right?"

"And destroy my career in the process."

"Maybe. Or maybe you'd find something better."

That evening, Sarah sat in her rental car outside the city hall, watching council members arrive for their emergency session. Her boss had already called twice to confirm she'd be there to expedite the paperwork.

Through the bookstore's windows across the street, she could see Alex working late, probably trying to organize his grandmother's papers, his family's legacy, for the legal battle he thought he had time to prepare for.

Sarah's hand hovered over  her car door handle. She could go in there, watch the process unfold, file the paperwork, and catch the morning train back to her corner office and her path to partnership.

Or she could walk across the street to a bookstore and help its owner fight the biggest corporation in the state.

The choice, she realized, would define not just her career, but who she was going to be for the rest of her life.

She got out of the car and started walking. But instead of heading toward city hall, she crossed the street to Rivera's Books & Coffee.

Alex looked up in surprise when she entered. "Shouldn't you be at the council meeting?"

"Probably," Sarah said. "Alex, do you have a lawyer?"

"I called everyone in town. They all have conflicts of interest—previous work with Blackwood Development." His smile was rueful. "Turns out your boss is very thorough about eliminating opposition."

Sarah took a deep breath. "What if I told you I know eminent domain law better than anyone in this county? What if I told you that the process they're trying to rush through tonight has procedural flaws that could tie them up in court for years?"

Alex stared at her. "I'd ask what you want in return."

"Nothing. Everything. I don't know." Sarah laughed, surprising herself. "I want to help you save this place, Alex. And I want to figure out who I am when I'm not destroying things that matter."

"Sarah, if you do this—"

"I'll probably lose my job. Definitely lose my shot at partner. Maybe get blacklisted from corporate law entirely." She looked around the store, at all the lives it had touched, all the community it had built. "But if I don't do this, I think I'll lose something more important."

Alex was quiet for a long moment. Then he smiled—the first real, unguarded smile she'd seen from him. "So, counselor, what's our first move?"

Sarah pulled out her phone and started typing. "We crash a city council meeting."`,
        isPremium: false,
        pointsCost: 0,
        readTime: 9,
        order: 3,
      },
      {
        id: "2-4",
        title: "No More Pages",
        content: `Sarah didn't go back to the city that night. Instead, she found herself in Millbrook's only hotel—a charming bed & breakfast run by an elderly couple who seemed delighted to have a guest.

"Most folks just pass through on their way somewhere else," Mrs. Patterson explained over breakfast. "It's nice to have someone who wants to stay awhile."

But Sarah wasn't staying for leisure. She was staying because she'd spent half the night reading about eminent domain cases, looking for loopholes, precedents, anything that might help her understand her options. What she'd found kept her awake until dawn.

Her phone rang as she was finishing her coffee. Richard Blackwood's name flashed on the screen.

"Mitchell, I've been thinking. If this bookstore owner won't sell, we'll expedite the eminent domain process. I've got connections on the city council."

"Sir, that could take months to fight in court—"

"Not if we don't give them time to fight. Emergency session tonight. Development declared essential for economic recovery. Very clean, very fast."

Sarah felt sick. "Is that legal?"

"It's business, Mitchell. And if you want to make partner next year, you'll make sure this goes smoothly."

After hanging up, Sarah sat staring at her phone. Partner. Everything she'd worked for. And all she had to do was let Alex Rivera get steamrolled by a process he wouldn't see coming until it was too late.

She walked downtown, ostensibly to scout locations for the development but really because she needed to see the bookstore again. To remind herself why this was just business.

Instead, she found Alex in the children's section, reading to a group of kindergarteners. His voice brought the story to life, and the children hung on every word. When he finished, they erupted in applause and demands for "one more!"

"Maybe next week," Alex said, grinning. "But first, who wants to pick out a book to take home?"

Sarah watched him help each child find something perfect—adventure for the boy who loved dinosaurs, a fairy tale for the girl who wanted to be a princess, a book about friendship for the shy child who always sat in the back.

"Ms. Sarah!" One of the children had spotted her. "Are you here for story time too?"

"I..." Sarah looked at Alex, who was watching her with an expression she couldn't read. "I was just browsing."

"Alex reads the best stories," the little girl confided. "And he always has the perfect book for everyone. What kind of stories do you like?"

"I don't really read stories," Sarah admitted. "Mostly legal briefs and contracts."

The child looked horrified. "That sounds very boring."

"It is," Sarah said, surprising herself with her honesty.

After the children left with their parents and their new books, Alex approached her. "So, what's the verdict? Found a good spot for the wrecking ball?"

Sarah's throat felt tight. "Alex, I need to tell you something. The city council is meeting tonight. Emergency session."

His face went very still. "Eminent domain?"

She nodded. "You'll get notice tomorrow, but the process will move fast. Days, not weeks."

"Why are you telling me this?"

Sarah looked around the store—at the community bulletin board, at the reading nook where generations had learned to love books, at the corner where Mrs. Henderson had met her husband. "Because this place matters. And because I'm not sure I want to be the person who destroys it."

"Sarah..." Alex stepped closer. "You could stop this. You know that, right?"

"And destroy my career in the process."

"Maybe. Or maybe you'd find something better."

That evening, Sarah sat in her rental car outside the city hall, watching council members arrive for their emergency session. Her boss had already called twice to confirm she'd be there to expedite the paperwork.

Through the bookstore's windows across the street, she could see Alex working late, probably trying to organize his grandmother's papers, his family's legacy, for the legal battle he thought he had time to prepare for.

Sarah's hand hovered over  her car door handle. She could go in there, watch the process unfold, file the paperwork, and catch the morning train back to her corner office and her path to partnership.

Or she could walk across the street to a bookstore and help its owner fight the biggest corporation in the state.

The choice, she realized, would define not just her career, but who she was going to be for the rest of her life.

She got out of the car and started walking. But instead of heading toward city hall, she crossed the street to Rivera's Books & Coffee.

Alex looked up in surprise when she entered. "Shouldn't you be at the council meeting?"

"Probably," Sarah said. "Alex, do you have a lawyer?"

"I called everyone in town. They all have conflicts of interest—previous work with Blackwood Development." His smile was rueful. "Turns out your boss is very thorough about eliminating opposition."

Sarah took a deep breath. "What if I told you I know eminent domain law better than anyone in this county? What if I told you that the process they're trying to rush through tonight has procedural flaws that could tie them up in court for years?"

Alex stared at her. "I'd ask what you want in return."

"Nothing. Everything. I don't know." Sarah laughed, surprising herself. "I want to help you save this place, Alex. And I want to figure out who I am when I'm not destroying things that matter."

"Sarah, if you do this—"

"I'll probably lose my job. Definitely lose my shot at partner. Maybe get blacklisted from corporate law entirely." She looked around the store, at all the lives it had touched, all the community it had built. "But if I don't do this, I think I'll lose something more important."

Alex was quiet for a long moment. Then he smiled—the first real, unguarded smile she'd seen from him. "So, counselor, what's our first move?"

Sarah pulled out her phone and started typing. "We crash a city council meeting."`,
        isPremium: false,
        pointsCost: 0,
        readTime: 10,
        order: 4,
      },
    ],
  },
  {
    id: "3",
    title: "The Last City",
    description:
      "In a world where civilization has crumbled, one city remains standing. Follow Maya as she uncovers the dark secrets that keep her home alive.",
    author: "Elena Rodriguez",
    coverImage:
      "https://img.freepik.com/free-vector/flat-vertical-poster-template-world-book-day-celebration_23-2150216808.jpg",
    category: { id: "1 ", label: "Sci-Fi", value: "sci-fi" },
    tags: ["Post-apocalyptic", "Adventure", "Mystery"],
    rating: 4.9,
    totalEpisodes: 5,
    totalReadTime: 45,
    isFeatured: true,
    episodes: [
      {
        id: "3-1",
        title: "The Wall",
        content: `Maya pressed her hand against the cold metal of the Wall, feeling the subtle vibrations that ran through it day and night. For twenty-three years, this barrier had protected New Eden from the wasteland beyond, but she had never questioned what powered it.

"Maya!" Her friend Zara called from across the plaza. "You're late for work again."

She pulled her hand away reluctantly. The tingling sensation always lingered for a few moments after touching the Wall. Her grandmother used to tell stories about the time before—when there were many cities, when people could travel freely between them. But those were just stories.

As she hurried to catch up with Zara, Maya didn't notice the small crack that had appeared where her hand had been. Inside the Wall, something ancient stirred.

The Council had always taught them that they were the last survivors of humanity, that everything beyond the Wall was dead and poisoned. But lately, Maya had been hearing sounds in the night—sounds that seemed to come from the other side.

She worked at the Energy Core, one of the few places where citizens were allowed to go deep underground. It was there, three levels below the surface, that she first saw the blue light seeping through the foundation stones. The same blue light that pulsed in the Wall.

Her supervisor, Dr. Chen, had been nervous all week. He kept glancing at the readings and muttering under his breath. When Maya asked what was wrong, he just shook his head.

"The balance is shifting," he finally whispered when they were alone. "The Wall... it's not what they tell us it is."

That night, Maya couldn't sleep. She found herself drawn back to the plaza, to the Wall that had always been the boundary of her world. Under the moonlight, she could see that the crack had grown larger.

As she approached, she heard it clearly for the first time—voices on the other side. Human voices.`,
        isPremium: false,
        pointsCost: 0,
        readTime: 8,
        order: 1,
      },
      {
        id: "3-2",
        title: "Beyond the Barrier",
        content: `The voices grew stronger as Maya pressed her ear to the crack. She could make out words now, fragments of conversation that made her heart race.

"...the harvest is failing..." "...they don't know..." "...how much longer can we maintain..."

She pulled back, gasping. The Wall wasn't keeping something out—it was keeping them in.

Over the next few days, Maya found herself making excuses to work late shifts. Dr. Chen was growing more agitated, and she overheard him arguing with Council members about "energy depletion" and "unsustainable extraction."

It was during one of these late nights that she discovered the truth. While running a routine check in the deepest level of the facility, she found a hidden room behind a maintenance panel. Inside, ancient computers hummed with data streams she'd never seen before.

The screens showed the outside world—not the barren wasteland she'd been taught about, but green fields and flowing rivers. Cities in the distance, very much alive. And most shocking of all, New Eden itself from the outside perspective—not a sanctuary, but a prison.

A soft footstep behind her made her spin around. Dr. Chen stood in the doorway, his face grave.

"I was wondering when you'd find this place," he said quietly. "Your grandmother used to work here, you know. Before the Council decided the truth was too dangerous."

Maya stared at him. "My grandmother?"

"She was one of the engineers who built the Wall. But not to keep danger out, Maya. To keep us from leaving. The Council made a deal with the Outside Territories fifty years ago. New Eden provides energy—human bioelectric energy—in exchange for protection and resources."

The room seemed to spin. "Human energy?"

Dr. Chen nodded grimly. "Every citizen of New Eden is connected to the Wall through those daily 'health scans' we all take. We're batteries, Maya. And the Wall is starting to fail because we're running out of people."

Through the crack in the Wall, the voices outside were getting louder. They were counting down to something. Maya realized with growing horror that it wasn't voices calling for help—it was voices preparing for harvest.`,
        isPremium: true,
        pointsCost: 8,
        readTime: 9,
        order: 2,
      },
      {
        id: "3-3",
        title: "The Resistance",
        content: `Maya spent the night poring over the hidden files with Dr. Chen. The truth was worse than she'd imagined. New Eden wasn't just a battery farm—it was an experiment. The Outside Territories were testing how much energy they could extract from a contained human population before it collapsed entirely.

"There are others who know," Dr. Chen explained, pulling up a secure communication system. "Your grandmother left us a network. We call ourselves the Awakened."

Names and faces appeared on the screen—people Maya recognized from around the city, all living double lives. The baker who always smiled too knowingly. The librarian who kept books the Council said were lost. The maintenance worker who hummed songs that didn't exist in their approved cultural database.

"We've been preparing for this moment," Dr. Chen continued. "The Wall is failing not just because of energy depletion, but because we've been sabotaging it. Carefully, slowly, for twenty years."

Maya's mind reeled. "But the people outside—they're coming to harvest us!"

"No, Maya. They're coming to rescue us. The voices you heard? They're the Territories' resistance movement. Not everyone Outside agreed with the Council's deal. They've been working to expose the truth and shut down the farms."

A soft alarm began beeping. Dr. Chen's face went pale as he checked the monitors.

"The Council knows we're here. Someone must have detected the breach in the Wall." He started frantically copying files to a portable device. "Maya, you have a choice to make. You can return to the surface, pretend this never happened, and live out your days as a battery. Or you can help us free everyone."

Through the speakers, they could hear security forces mobilizing above. Maya thought of everyone she knew—Zara, her neighbors, the children in the education centers who had never seen a real sunset.

"What do I need to do?"

Dr. Chen smiled, and for the first time, he looked hopeful. "We need to bring down the Wall completely. Tonight. Before the Council can implement their Emergency Protocol."

"What's Emergency Protocol?"

"When a farm becomes unprofitable, they eliminate the population and start over somewhere else. We have maybe six hours before they flood the city with neural gas."

Maya's hands trembled as she took the device from him. "How do we bring down something that's kept us prisoner for fifty years?"

"With the same energy that built it. Every citizen's bioelectric signature is registered in the Wall's core. If we can reverse the flow—turn us from batteries into overloaders—the whole system will collapse."

The sound of footsteps echoed from the corridor above. Dr. Chen activated a hidden exit.

"There are three other Awakened at key positions throughout the city. You need to reach them and coordinate the overload. Maya—your grandmother died trying to do this. Don't let her sacrifice be in vain."`,
        isPremium: true,
        pointsCost: 10,
        readTime: 10,
        order: 3,
      },
      {
        id: "3-4",
        title: "The Breaking Point",
        content: `Maya emerged from the underground through a hidden passage in the old cemetery, her heart pounding as searchlights swept the streets above. The city felt different now that she knew the truth—every building, every street corner was part of an elaborate cage.

Using Dr. Chen's device, she made contact with the first Awakened member: Sara Kim, who worked at the Central Processing Hub where all citizens' bioelectric data was monitored.

"Maya? Thank god," Sara's voice crackled through the secure channel. "The Council's mobilizing everything. They're telling people there's been a terrorist attack, that everyone needs to report to emergency gathering points for 'safety scans.'"

"That's the neural gas deployment," Maya realized. "We need to move now."

She ran through the empty streets, avoiding the security patrols. The second Awakened member, Marcus Webb, was stationed at the North Energy Relay. When she reached his position, she found him already working frantically at a control panel.

"I can reverse the flow from here," he said without looking up, "but I need the other stations to coordinate the timing. If we're off by even a few seconds, the backlash will kill half the city before the Wall comes down."

Maya's communicator buzzed with an emergency message from the third member, Elena Torres at the South Relay. "Council forces are storming my position. I can hold them for maybe ten minutes, but—"

The transmission cut to static.

"We have to go now," Marcus said grimly. "Elena was going to handle the final synchronization, but you'll have to do it from the Core."

Maya looked at the device in her hands. "I don't know how—"

"Your grandmother's access codes are in there. The Wall recognizes genetic markers from the original builders. Maya, you might be the only person in the city who can actually interface directly with the system."

Through the windows, they could see citizens being herded toward the gathering points by security forces. Many were already looking drowsy—the neural gas was being released in small doses to make people compliant.

Maya sprinted back toward the Energy Core, dodging patrols and using maintenance tunnels her new knowledge had revealed. When she reached the deepest level, she found Dr. Chen's body. He'd held the security forces off as long as he could.

With tears in her eyes, she connected the device to the central console. The Wall's core system was massive—a pulsing network of energy conduits that fed off the life force of every person in New Eden. She could see the bioelectric signatures of her friends, her neighbors, everyone she'd ever known, all slowly being drained.

The interface recognized her genetic signature. Suddenly, her grandmother's voice filled the room—a pre-recorded message triggered by Maya's access.

"If you're hearing this, Maya, then the time has finally come. I'm sorry we couldn't free them in my lifetime. The override sequence is in your DNA—the Wall will respond to your direct touch. But Maya, listen carefully: when you reverse the flow, you'll be channeling the combined life force of forty thousand people through yourself. You might not survive it."

Maya placed her hands on the core interface. She could feel the Wall's power, the weight of all those lives. Outside, she could hear the voices from beyond growing louder—the rescue teams were ready.

"I love you, grandmother," she whispered, and pushed all her energy into the system.

The Wall began to crack, loudly and violently. Throughout New Eden, every citizen suddenly felt a surge of vitality they hadn't experienced in years as their stolen energy returned to them. The gathering points erupted in confusion as people shook off the neural gas effects and realized what was happening.

Maya collapsed as the Wall's death throes shook the entire city, but she was smiling. Through the widening cracks, she could see the first rays of actual sunlight New Eden had seen in fifty years.`,
        isPremium: true,
        pointsCost: 12,
        readTime: 12,
        order: 4,
      },
      {
        id: "1-5",
        title: "New Dawn",
        content: `Maya woke up in a medical tent outside the ruins of the Wall, her body weak but alive. The first face she saw was Zara's, tears streaming down her cheeks.

"You did it," Zara whispered. "You actually did it."

Beyond the tent flaps, Maya could see a world she'd never imagined. Rolling hills stretched to the horizon under an endless blue sky. Citizens of New Eden were wandering around in amazement, many seeing natural sunlight for the first time in their lives.

Dr. Patricia Voss, a representative from the Outside Territories, sat down beside Maya's bed. "The energy farms have been shut down across twelve regions. Your city was one of the last, and definitely the most heavily fortified. What you did here—it's going to save thousands of lives."

"What happens now?" Maya asked weakly.

"Now you rebuild. The Territories are providing resources and medical aid, but New Eden—or whatever you choose to call yourselves now—will be independent. No more Councils, no more energy extraction. You're free."

Over the following weeks, Maya learned about the world beyond the Wall. The Territories weren't a single government but a loose alliance of free cities, each developing their own sustainable technologies. The energy farms had been a conspiracy by a corporate faction that had been overthrown years ago—but they'd hidden the farms' existence from the mainstream Territory leadership.

Maya found herself appointed as a liaison between her people and the outside world, helping to coordinate the massive transition. It wasn't easy—many citizens struggled with agoraphobia after a lifetime of confinement, and there were heated debates about whether to rebuild on the same spot or relocate entirely.

But there were miracles too. Children laughed as they ran through grass for the first time. Elderly citizens who had been born before the Wall shared suppressed memories of the outside world. Artists created works inspired by horizons they'd never seen.

Six months later, Maya stood where the Wall's main gate had been, now just a pile of twisted metal and crystal. The settlement they'd built was smaller than New Eden but infinitely more alive. Gardens flourished where energy conduits once ran. Children played games that would have been impossible in the confined city.

Zara approached, carrying a tablet with architectural plans. "The Council's old headquarters—we're converting it into a school. And Maya, we want to name it after your grandmother."

Maya smiled, watching the sunset paint the sky in colors that no Wall could ever contain. "She'd like that."

In the distance, other settlements were visible—former energy farms that had also been liberated, now growing into vibrant communities. The horizon no longer meant the end of the world, but the beginning of infinite possibilities.

Maya pulled out her communicator and started recording a message for other farms that might still be operating in hidden corners of the world:

"This is Maya Chen of Free Eden, broadcasting on the liberation frequency. If you're listening to this from behind a Wall, know that there is a world beyond it waiting for you. And know that you are not alone. The barriers they built to contain us have become the bridges we'll use to find each other."

She sent the message out into the vast, open world, and for the first time in her life, truly felt free.`,
        isPremium: true,
        pointsCost: 8,
        readTime: 11,
        order: 5,
      },
    ],
  },
  {
    id: "4",
    title: "Shadows of the Heart",
    description:
      "When corporate lawyer Sarah meets mysterious bookstore owner Alex, she discovers that some love stories are worth fighting the whole world for.",
    author: "Maria Santos",
    coverImage:
      "https://img.freepik.com/free-vector/book-with-scene-sugar-gliders-forest_1308-103484.jpg?t=st=1754491420~exp=1754495020~hmac=4475a88f6ac2c9e6565eee765c1f579ff5558188c116dcb0d6114e6475f4493a&w=2000",
    category: { id: "1 ", label: "Sci-Fi", value: "sci-fi" },
    tags: ["Contemporary", "Enemies to lovers", "Small town"],
    rating: 5.0,
    totalEpisodes: 3,
    totalReadTime: 32,
    isFeatured: true,
    episodes: [
      {
        id: "4-1",
        title: "Collision Course",
        content: `Sarah Mitchell had exactly forty-seven minutes to catch her train back to the city when she collided with the most infuriating man she'd ever met.

"Watch it!" she snapped, papers scattering from her briefcase across the sidewalk.

The stranger—tall, dark-haired, with paint-stained fingers—just smiled infuriatingly as he helped gather her documents. "Sorry about that. You seemed like you were in a hurry to escape our little town."

"I am," Sarah said curtly, snatching the papers from his hands. She was here on business—her law firm was handling the acquisition of prime downtown real estate for a major development project. Get in, get signatures, get out. That was the plan.

"Sarah Mitchell, Corporate Development Attorney," the man read from one of her business cards before handing it back. "I'm Alex Rivera. I own that little bookstore you're probably planning to tear down."

Sarah's stomach dropped. This was the holdout property owner her firm had been trying to reach for weeks. The charming bookstore directly in the center of their development zone—and its stubborn owner who refused to return their calls.

"Mr. Rivera. I've been trying to reach you."

"I know." His smile didn't reach his eyes. "I've been avoiding you."

Sarah checked her watch. Forty-three minutes. "Look, I understand you're attached to your business, but our offer is extremely generous. You could open a new bookstore anywhere with what we're offering."

"Could I?" Alex gestured to the building behind him—a century-old brick structure with ivy climbing its walls and a hand-painted sign that read 'Rivera's Books & Coffee.' "Could I recreate the corner where Mrs. Henderson met her husband sixty years ago? Or the reading nook where three generations of the Patterson family learned to love books?"

"Mr. Rivera, I appreciate the sentiment, but—"

"But sentiment doesn't pay corporate bonuses." Alex's voice was calm, but Sarah caught the edge underneath. "Ms. Mitchell, that train you're rushing to catch? It'll still be running tomorrow. Maybe you should stick around and see what you're so eager to destroy."

Sarah's phone buzzed with a text from her boss: Deal closed yet? Board meeting moved to Monday. Need this wrapped up.

"I can't," she said, already walking away. "I have a job to do."

"So do I," Alex called after her. "And mine involves protecting this place."

Sarah made her train with thirty seconds to spare, but as the small town disappeared behind her, she couldn't stop thinking about paint-stained fingers and eyes that seemed to see right through her professional armor. This was just business, she told herself. It always was.

But that night, she found herself researching Rivera's Books & Coffee online, scrolling through photos of cozy reading corners, community events, and hundreds of five-star reviews from locals talking about how the store had changed their lives.

For the first time in her career, Sarah Mitchell fell asleep wondering if maybe, just maybe, she was on the wrong side of a deal.`,
        isPremium: false,
        pointsCost: 0,
        readTime: 8,
        order: 1,
      },
      {
        id: "4-2",
        title: "Terms of Engagement",
        content: `Sarah's boss was not pleased.

"What do you mean he won't negotiate?" Richard Blackwood's voice carried across the conference room like a knife. "Everyone has a price, Mitchell. Find his."

Sarah stared at the legal documents spread across the mahogany table—contracts, property assessments, acquisition agreements. All perfectly legal, all designed to clear the way for Blackwood Development's newest luxury complex. All currently useless thanks to one stubborn bookstore owner.

"I've made three offers, sir. Each one above market value. He's not interested in money."

"Then find out what he is interested in. You're going back to Millbrook tomorrow."

Sarah's heart did something complicated at the thought of seeing Alex Rivera again. She'd been trying not to think about their encounter for three days, but his words kept echoing in her head: 'See what you're so eager to destroy.'

The next morning found her standing outside Rivera's Books & Coffee at opening time, armed with a new strategy and a cardboard tray holding two coffee cups.

Alex looked up from arranging a window display of local authors when she knocked. His surprise was quickly replaced by wariness.

"Ms. Mitchell. Back so soon?"

"I brought coffee. A peace offering."

He opened the door, and she stepped into what felt like another world. Morning sunlight streamed through tall windows, illuminating shelves that stretched from floor to ceiling. The smell of coffee beans mixed with old paper and something else—something that felt like home.

"This is beautiful," she said, and meant it.

"My grandmother opened this place in 1952," Alex said, accepting the coffee. "She survived the Depression, two wars, and a dozen economic downturns. This store was her life's work."

"Was?"

"She passed five years ago. Left me the store and a promise to never let it become another corporate casualty." Alex gestured to a wall of framed photos—decades of community events, book clubs, children's story times. "These people aren't just customers, Ms. Mitchell. They're family."

Sarah found herself studying the photos, seeing the same faces at different ages, different events. Children who grew up into teenagers, teenagers who became parents, bringing their own children to story time. A community built around books and connection.

"Sarah," she said softly.

"What?"

"My name is Sarah. Not Ms. Mitchell."

Alex smiled, and this time it reached his eyes. "Sarah. Would you like the tour?"

For the next hour, Sarah forgot she was supposed to be conducting business. Alex showed her the rare books collection his grandmother had carefully curated, the children's section with its hand-painted murals, the cozy café area where locals gathered every morning to solve the world's problems over espresso.

But it was the community bulletin board that stopped her cold. Dozens of thank-you notes, photos, and testimonials covered every inch. "This place saved my marriage." "Found my best friend in your book club." "Thank you for giving my daughter a safe place to read when home wasn't safe."

"My development will bring jobs," Sarah said quietly, but the words felt hollow. "Economic growth. Progress."

"Whose definition of progress?" Alex asked. "The board members who'll never live here? The investors who see this town as a profit margin?"

Sarah's phone buzzed. Another text from Richard: Board meeting tomorrow at 9. Better have good news.

"I have to make this deal happen," Sarah said, more to herself than to Alex. "My career depends on it."

"And if your career depends on destroying what matters to other people, what does that say about your career?"

The question hit like a physical blow. Sarah had worked for twelve years to make senior associate at Blackwood Development. She'd sacrificed relationships, friendships, and countless nights and weekends. She'd told herself it was all worth it, that success justified everything.

But standing in this store, surrounded by evidence of a different kind of success—the kind measured in community bonds and changed lives—she wasn't sure anymore.

"I should go," she said.

Alex walked her to the door. "Sarah? That offer you made—what happens if I don't accept it?"

Sarah met his eyes. "Eminent domain. The city council will declare this area blighted and force the sale."

"Even though it's not blighted?"

"Even though it's not blighted."

Alex nodded grimly. "Then I guess we both have decisions to make."

As Sarah walked back to her rental car, she realized she wasn't just fighting for a development deal anymore. She was fighting for the right to look at herself in the mirror, and she wasn't sure which side of this battle would let her do that.`,
        isPremium: false,
        pointsCost: 0,
        readTime: 9,
        order: 2,
      },
      {
        id: "4-3",
        title: "Changing Pages",
        content: `Sarah didn't go back to the city that night. Instead, she found herself in Millbrook's only hotel—a charming bed & breakfast run by an elderly couple who seemed delighted to have a guest.

"Most folks just pass through on their way somewhere else," Mrs. Patterson explained over breakfast. "It's nice to have someone who wants to stay awhile."

But Sarah wasn't staying for leisure. She was staying because she'd spent half the night reading about eminent domain cases, looking for loopholes, precedents, anything that might help her understand her options. What she'd found kept her awake until dawn.

Her phone rang as she was finishing her coffee. Richard Blackwood's name flashed on the screen.

"Mitchell, I've been thinking. If this bookstore owner won't sell, we'll expedite the eminent domain process. I've got connections on the city council."

"Sir, that could take months to fight in court—"

"Not if we don't give them time to fight. Emergency session tonight. Development declared essential for economic recovery. Very clean, very fast."

Sarah felt sick. "Is that legal?"

"It's business, Mitchell. And if you want to make partner next year, you'll make sure this goes smoothly."

After hanging up, Sarah sat staring at her phone. Partner. Everything she'd worked for. And all she had to do was let Alex Rivera get steamrolled by a process he wouldn't see coming until it was too late.

She walked downtown, ostensibly to scout locations for the development but really because she needed to see the bookstore again. To remind herself why this was just business.

Instead, she found Alex in the children's section, reading to a group of kindergarteners. His voice brought the story to life, and the children hung on every word. When he finished, they erupted in applause and demands for "one more!"

"Maybe next week," Alex said, grinning. "But first, who wants to pick out a book to take home?"

Sarah watched him help each child find something perfect—adventure for the boy who loved dinosaurs, a fairy tale for the girl who wanted to be a princess, a book about friendship for the shy child who always sat in the back.

"Ms. Sarah!" One of the children had spotted her. "Are you here for story time too?"

"I..." Sarah looked at Alex, who was watching her with an expression she couldn't read. "I was just browsing."

"Alex reads the best stories," the little girl confided. "And he always has the perfect book for everyone. What kind of stories do you like?"

"I don't really read stories," Sarah admitted. "Mostly legal briefs and contracts."

The child looked horrified. "That sounds very boring."

"It is," Sarah said, surprising herself with her honesty.

After the children left with their parents and their new books, Alex approached her. "So, what's the verdict? Found a good spot for the wrecking ball?"

Sarah's throat felt tight. "Alex, I need to tell you something. The city council is meeting tonight. Emergency session."

His face went very still. "Eminent domain?"

She nodded. "You'll get notice tomorrow, but the process will move fast. Days, not weeks."

"Why are you telling me this?"

Sarah looked around the store—at the community bulletin board, at the reading nook where generations had learned to love books, at the corner where Mrs. Henderson had met her husband. "Because this place matters. And because I'm not sure I want to be the person who destroys it."

"Sarah..." Alex stepped closer. "You could stop this. You know that, right?"

"And destroy my career in the process."

"Maybe. Or maybe you'd find something better."

That evening, Sarah sat in her rental car outside the city hall, watching council members arrive for their emergency session. Her boss had already called twice to confirm she'd be there to expedite the paperwork.

Through the bookstore's windows across the street, she could see Alex working late, probably trying to organize his grandmother's papers, his family's legacy, for the legal battle he thought he had time to prepare for.

Sarah's hand hovered over  her car door handle. She could go in there, watch the process unfold, file the paperwork, and catch the morning train back to her corner office and her path to partnership.

Or she could walk across the street to a bookstore and help its owner fight the biggest corporation in the state.

The choice, she realized, would define not just her career, but who she was going to be for the rest of her life.

She got out of the car and started walking. But instead of heading toward city hall, she crossed the street to Rivera's Books & Coffee.

Alex looked up in surprise when she entered. "Shouldn't you be at the council meeting?"

"Probably," Sarah said. "Alex, do you have a lawyer?"

"I called everyone in town. They all have conflicts of interest—previous work with Blackwood Development." His smile was rueful. "Turns out your boss is very thorough about eliminating opposition."

Sarah took a deep breath. "What if I told you I know eminent domain law better than anyone in this county? What if I told you that the process they're trying to rush through tonight has procedural flaws that could tie them up in court for years?"

Alex stared at her. "I'd ask what you want in return."

"Nothing. Everything. I don't know." Sarah laughed, surprising herself. "I want to help you save this place, Alex. And I want to figure out who I am when I'm not destroying things that matter."

"Sarah, if you do this—"

"I'll probably lose my job. Definitely lose my shot at partner. Maybe get blacklisted from corporate law entirely." She looked around the store, at all the lives it had touched, all the community it had built. "But if I don't do this, I think I'll lose something more important."

Alex was quiet for a long moment. Then he smiled—the first real, unguarded smile she'd seen from him. "So, counselor, what's our first move?"

Sarah pulled out her phone and started typing. "We crash a city council meeting."`,
        isPremium: false,
        pointsCost: 0,
        readTime: 9,
        order: 3,
      },
    ],
  },
];
