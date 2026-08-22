import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Filter,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Candidate = {
  id: number;
  name: string;
  role: string;
  initials: string;
  category: string;
  skills: string[];
  experience: string;
  company: string;
  ratings: {
    leadership: number;
    teamwork: number;
    communication: number;
  };
  review: string;
  verifiedSignals: number;
};

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Ana Torres",
    role: "Software Engineer",
    initials: "AT",
    category: "Engineering",
    skills: ["Python", "Machine Learning", "React"],
    experience: "2 years of software development experience",
    company: "Coral",
    ratings: { leadership: 4, teamwork: 5, communication: 5 },
    review:
      "Demonstrated strong leadership and consistently delivered work on time.",
    verifiedSignals: 5,
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Full Stack Developer",
    initials: "CM",
    category: "Engineering",
    skills: ["Python", "React", "Docker"],
    experience: "3 years of full stack development experience",
    company: "Nexo Labs",
    ratings: { leadership: 3, teamwork: 4, communication: 4 },
    review:
      "Consistently contributed reliable backend work and communicated clearly.",
    verifiedSignals: 4,
  },
  {
    id: 3,
    name: "Sofía Ruiz",
    role: "Data Analyst",
    initials: "SR",
    category: "Data & AI",
    skills: ["Python", "SQL", "Statistics"],
    experience: "2 years of analytics and data experience",
    company: "Andina Insights",
    ratings: { leadership: 3, teamwork: 4, communication: 5 },
    review:
      "Excellent analytical rigor and reliable documentation practices.",
    verifiedSignals: 4,
  },
  {
    id: 4,
    name: "Mateo Vega",
    role: "ML Engineer",
    initials: "MV",
    category: "Data & AI",
    skills: ["Python", "TensorFlow", "NLP"],
    experience: "4 years of machine learning engineering",
    company: "Nova Research",
    ratings: { leadership: 5, teamwork: 4, communication: 4 },
    review:
      "Led the model deployment initiative and supported the entire team.",
    verifiedSignals: 6,
  },
  {
    id: 5,
    name: "Valentina Cruz",
    role: "Product Designer",
    initials: "VC",
    category: "Product",
    skills: ["Figma", "Research", "Prototyping"],
    experience: "3 years of product design experience",
    company: "Marea Studio",
    ratings: { leadership: 4, teamwork: 5, communication: 5 },
    review:
      "Created clarity across teams and consistently advocated for users.",
    verifiedSignals: 5,
  },
  {
    id: 6,
    name: "Diego Paredes",
    role: "Backend Developer",
    initials: "DP",
    category: "Engineering",
    skills: ["Node.js", "PostgreSQL", "AWS"],
    experience: "5 years of backend development experience",
    company: "CloudPeak",
    ratings: { leadership: 4, teamwork: 4, communication: 4 },
    review:
      "Reliable delivery and strong ownership of production systems.",
    verifiedSignals: 4,
  },
];

const filters = ["All talent", "Engineering", "Data & AI", "Product", "Python"];

const avatarColors = ["#DDEDE8", "#F7E3DE", "#E5E3F8", "#F8EDC9", "#DDEBF4"];

function RatingStars({ rating }: { rating: number }) {
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={13}
          color={value <= rating ? "#D49B35" : "#CBD5D0"}
          fill={value <= rating ? "#D49B35" : "transparent"}
        />
      ))}
    </View>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        active && styles.filterChipActive,
        pressed && styles.pressedSmall,
      ]}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function TalentCard({
  candidate,
  index,
  onPress,
}: {
  candidate: Candidate;
  index: number;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).duration(450).springify()}
      style={[styles.cardWrapper, animatedStyle]}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
        style={styles.talentCard}
      >
        <View
          style={[
            styles.avatar,
            { backgroundColor: avatarColors[index % avatarColors.length] },
          ]}
        >
          <Text style={styles.avatarText}>{candidate.initials}</Text>
        </View>

        <View style={styles.verifiedRow}>
          <BadgeCheck size={13} color="#278565" />
          <Text style={styles.verifiedText}>
            {candidate.verifiedSignals} verified signals
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.candidateName}>
          {candidate.name}
        </Text>

        <Text numberOfLines={2} style={styles.candidateRole}>
          {candidate.role}
        </Text>

        <View style={styles.skillRow}>
          {candidate.skills.slice(0, 2).map((skill) => (
            <View key={skill} style={styles.skillTag}>
              <Text numberOfLines={1} style={styles.skillText}>
                {skill}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.evidenceLink}>
            <ShieldCheck size={14} color="#155E59" />
            <Text style={styles.evidenceLinkText}>View evidence</Text>
          </View>
          <ChevronRight size={17} color="#78908A" />
        </View>
      </Pressable>
    </Animated.View>
  );
}

function CandidateModal({
  candidate,
  onClose,
}: {
  candidate: Candidate | null;
  onClose: () => void;
}) {
  if (!candidate) return null;

  return (
    <Modal
      visible={Boolean(candidate)}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.sheet}>
          <View style={styles.modalHandle} />

          <View style={styles.modalHeader}>
            <View
              style={[
                styles.modalAvatar,
                { backgroundColor: "#DDEDE8" },
              ]}
            >
              <Text style={styles.modalAvatarText}>{candidate.initials}</Text>
            </View>

            <View style={styles.modalIdentity}>
              <Text style={styles.modalName}>{candidate.name}</Text>
              <Text style={styles.modalRole}>{candidate.role}</Text>
            </View>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={22} color="#70817A" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalSummary}>
              <Sparkles size={17} color="#155E59" />
              <Text style={styles.modalSummaryText}>
                Candidate profile with {candidate.verifiedSignals} evidence-backed
                professional signals.
              </Text>
            </View>

            <Text style={styles.sectionLabel}>PROFESSIONAL OVERVIEW</Text>

            <View style={styles.overviewRow}>
              <BriefcaseBusiness size={17} color="#155E59" />
              <View style={{ flex: 1 }}>
                <Text style={styles.overviewTitle}>{candidate.company}</Text>
                <Text style={styles.overviewText}>{candidate.experience}</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>SKILLS</Text>

            <View style={styles.modalSkills}>
              {candidate.skills.map((skill) => (
                <View key={skill} style={styles.modalSkill}>
                  <Text style={styles.modalSkillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionLabel}>EMPLOYER EVALUATIONS</Text>

            {Object.entries(candidate.ratings).map(([label, rating]) => (
              <View style={styles.ratingRow} key={label}>
                <Text style={styles.ratingLabel}>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </Text>
                <RatingStars rating={rating} />
              </View>
            ))}

            <View style={styles.reviewBox}>
              <View style={styles.reviewHeader}>
                <ShieldCheck size={16} color="#278565" />
                <Text style={styles.reviewTitle}>VERIFIED EMPLOYER REVIEW</Text>
              </View>
              <Text style={styles.reviewText}>“{candidate.review}”</Text>
              <Text style={styles.reviewCaption}>
                Employer feedback · analyzed locally
              </Text>
            </View>

            <Pressable style={styles.profileButton} onPress={onClose}>
              <Text style={styles.profileButtonText}>Close profile</Text>
              <X size={17} color="#FFFFFF" />
            </Pressable>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

function AiSearchModal({
  visible,
  query,
  setQuery,
  onClose,
  onSearch,
}: {
  visible: boolean;
  query: string;
  setQuery: (value: string) => void;
  onClose: () => void;
  onSearch: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.aiOverlay}>
        <Animated.View entering={FadeInUp.duration(350)} style={styles.aiSheet}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIcon}>
              <Sparkles size={21} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>Find with AI</Text>
              <Text style={styles.aiSubtitle}>Private local candidate search</Text>
            </View>
            <Pressable onPress={onClose}>
              <X size={22} color="#72837C" />
            </Pressable>
          </View>

          <View style={styles.aiPrivate}>
            <LockKeyhole size={15} color="#278565" />
            <Text style={styles.aiPrivateText}>
              Your search is processed locally with QVAC.
            </Text>
          </View>

          <Text style={styles.aiLabel}>DESCRIBE WHO YOU NEED</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            multiline
            textAlignVertical="top"
            placeholder="Example: I need a Python developer with AI experience..."
            placeholderTextColor="#9BAAA4"
            style={styles.aiInput}
          />

          <Pressable onPress={onSearch} style={styles.aiSearchButton}>
            <Sparkles size={17} color="#FFFFFF" />
            <Text style={styles.aiSearchText}>Analyze candidates</Text>
            <ChevronRight size={17} color="#FFFFFF" />
          </Pressable>

          <Text style={styles.aiDisclaimer}>
            TalentMatch assists screening. Final hiring decisions remain human.
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState("All talent");
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [aiVisible, setAiVisible] = useState(false);
  const [query, setQuery] = useState(
    "I need a Python developer with AI experience, strong leadership and teamwork."
  );

  const filteredCandidates = useMemo(() => {
    const normalizedTerm = term.toLowerCase().trim();

    return candidates.filter((candidate) => {
      const searchable = [
        candidate.name,
        candidate.role,
        candidate.category,
        candidate.skills.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedTerm || searchable.includes(normalizedTerm);

      const matchesFilter =
        activeFilter === "All talent" ||
        candidate.category === activeFilter ||
        candidate.skills.some(
          (skill) => skill.toLowerCase() === activeFilter.toLowerCase()
        );

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, term]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>TalentMatch</Text>
            <Text style={styles.brandSub}>PRIVATE TALENT DIRECTORY</Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.headerIcon}>
              <Users size={18} color="#36514A" />
            </Pressable>

            <Pressable
              onPress={() => setAiVisible(true)}
              style={styles.aiHeaderButton}
            >
              <Sparkles size={15} color="#FFFFFF" />
              <Text style={styles.aiHeaderText}>Find with AI</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.duration(500)}>
            <Text style={styles.title}>
              Find the right person,{"\\n"}with the right evidence.
            </Text>

            <Text style={styles.subtitle}>
              Explore professional profiles and employer signals privately,
              on your device.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.searchBox}>
            <Search size={18} color="#799087" />
            <TextInput
              value={term}
              onChangeText={setTerm}
              placeholder="Search name, role or skill"
              placeholderTextColor="#9BAAA4"
              style={styles.searchInput}
            />
            <Filter size={17} color="#155E59" />
          </Animated.View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filters.map((filter, index) => (
              <Animated.View
                entering={FadeIn.delay(220 + index * 60).duration(300)}
                key={filter}
              >
                <FilterChip
                  label={filter}
                  active={filter === activeFilter}
                  onPress={() => setActiveFilter(filter)}
                />
              </Animated.View>
            ))}
          </ScrollView>

          <View style={styles.directoryHeader}>
            <View>
              <Text style={styles.directoryTitle}>Talent directory</Text>
              <Text style={styles.directoryCount}>
                {filteredCandidates.length} professionals available
              </Text>
            </View>

            <View style={styles.localBadge}>
              <LockKeyhole size={12} color="#278565" />
              <Text style={styles.localBadgeText}>LOCAL DATA</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {filteredCandidates.map((candidate, index) => (
              <TalentCard
                key={candidate.id}
                candidate={candidate}
                index={index}
                onPress={() => setSelected(candidate)}
              />
            ))}
          </View>

          {filteredCandidates.length === 0 ? (
            <View style={styles.emptyState}>
              <Award size={28} color="#155E59" />
              <Text style={styles.emptyTitle}>No professionals found</Text>
              <Text style={styles.emptyText}>
                Try another search or select All talent.
              </Text>
            </View>
          ) : null}

          <View style={styles.footerNote}>
            <CheckCircle2 size={16} color="#278565" />
            <Text style={styles.footerNoteText}>
              Claims are self-reported. Evidence is reviewed separately.
            </Text>
          </View>
        </ScrollView>
      </View>

      <CandidateModal candidate={selected} onClose={() => setSelected(null)} />

      <AiSearchModal
        visible={aiVisible}
        query={query}
        setQuery={setQuery}
        onClose={() => setAiVisible(false)}
        onSearch={() => {
          setAiVisible(false);
          // Temporalmente, para la demo visual, el botón lleva a los resultados existentes.
          // Luego Jhostin conectará aquí el POST /api/search.
          setTerm("python");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F8F6",
  },
  page: {
    flex: 1,
    backgroundColor: "#F7F8F6",
  },
  content: {
    padding: 20,
    paddingBottom: 38,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#E6ECE8",
  },
  brand: {
    color: "#17231F",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  brandSub: {
    color: "#5F7770",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.1,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EBE7",
  },
  aiHeaderButton: {
    minHeight: 38,
    borderRadius: 13,
    paddingHorizontal: 11,
    backgroundColor: "#155E59",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  aiHeaderText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
  title: {
    color: "#182520",
    fontSize: 29,
    fontWeight: "900",
    letterSpacing: -1.1,
    lineHeight: 34,
  },
  subtitle: {
    color: "#71817B",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  searchBox: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3EAE5",
    marginTop: 22,
  },
  searchInput: {
    flex: 1,
    color: "#24352F",
    fontSize: 14,
    fontWeight: "600",
  },
  filterRow: {
    gap: 8,
    paddingTop: 15,
    paddingBottom: 23,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E9E7",
  },
  filterChipActive: {
    backgroundColor: "#155E59",
    borderColor: "#155E59",
  },
  filterText: {
    color: "#52615D",
    fontSize: 12,
    fontWeight: "800",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  pressedSmall: {
    opacity: 0.72,
    transform: [{ scale: 0.95 }],
  },
  directoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  directoryTitle: {
    color: "#1D2B26",
    fontSize: 18,
    fontWeight: "900",
  },
  directoryCount: {
    color: "#82918B",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },
  localBadge: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#E5F4EC",
  },
  localBadgeText: {
    color: "#397267",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48.3%",
    marginBottom: 14,
  },
  talentCard: {
    minHeight: 248,
    padding: 14,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9EEEB",
    shadowColor: "#183B34",
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#155E59",
    fontSize: 17,
    fontWeight: "900",
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  verifiedText: {
    color: "#2E9B70",
    fontSize: 10,
    fontWeight: "800",
  },
  candidateName: {
    color: "#192522",
    fontSize: 15,
    fontWeight: "900",
  },
  candidateRole: {
    color: "#71817B",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
    minHeight: 30,
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 10,
  },
  skillTag: {
    maxWidth: "100%",
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: "#F0F6F3",
  },
  skillText: {
    color: "#397267",
    fontSize: 10,
    fontWeight: "800",
  },
  cardFooter: {
    marginTop: 14,
    paddingTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EDF1EE",
  },
  evidenceLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  evidenceLinkText: {
    color: "#155E59",
    fontSize: 11,
    fontWeight: "900",
  },
  stars: {
    flexDirection: "row",
    gap: 3,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15,29,25,0.40)",
  },
  sheet: {
    maxHeight: "86%",
    padding: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#F8FAF8",
  },
  modalHandle: {
    width: 44,
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#CAD6D0",
    marginBottom: 18,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 18,
  },
  modalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  modalAvatarText: {
    color: "#155E59",
    fontSize: 18,
    fontWeight: "900",
  },
  modalIdentity: {
    flex: 1,
  },
  modalName: {
    color: "#192522",
    fontSize: 21,
    fontWeight: "900",
  },
  modalRole: {
    color: "#71817B",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 3,
  },
  closeButton: {
    padding: 3,
  },
  modalSummary: {
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#E8F5EE",
    marginBottom: 20,
  },
  modalSummaryText: {
    flex: 1,
    color: "#25564B",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
  },
  sectionLabel: {
    color: "#84938D",
    fontSize: 10,
    letterSpacing: 0.9,
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 5,
  },
  overviewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5EBE7",
    marginBottom: 18,
  },
  overviewTitle: {
    color: "#31423C",
    fontSize: 14,
    fontWeight: "900",
  },
  overviewText: {
    color: "#71817B",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },
  modalSkills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 18,
  },
  modalSkill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: "#E8F5EE",
  },
  modalSkillText: {
    color: "#397267",
    fontSize: 12,
    fontWeight: "800",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#E4EBE6",
  },
  ratingLabel: {
    color: "#40524B",
    fontSize: 13,
    fontWeight: "800",
  },
  reviewBox: {
    padding: 16,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1EAE4",
    marginTop: 21,
    marginBottom: 17,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 10,
  },
  reviewTitle: {
    color: "#278565",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  reviewText: {
    color: "#394A44",
    lineHeight: 20,
    fontSize: 14,
    fontWeight: "700",
  },
  reviewCaption: {
    color: "#8A9993",
    fontSize: 11,
    marginTop: 10,
    fontWeight: "700",
  },
  profileButton: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: "#155E59",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  profileButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  aiOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(15,29,25,0.42)",
  },
  aiSheet: {
    padding: 20,
    borderRadius: 27,
    backgroundColor: "#F8FAF8",
    shadowColor: "#183B34",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 18,
  },
  aiIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#155E59",
  },
  aiTitle: {
    color: "#192522",
    fontSize: 20,
    fontWeight: "900",
  },
  aiSubtitle: {
    color: "#71817B",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  aiPrivate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 13,
    backgroundColor: "#E8F5EE",
    marginBottom: 20,
  },
  aiPrivateText: {
    color: "#397267",
    fontSize: 12,
    fontWeight: "700",
  },
  aiLabel: {
    color: "#84938D",
    fontSize: 10,
    letterSpacing: 0.9,
    fontWeight: "900",
    marginBottom: 9,
  },
  aiInput: {
    minHeight: 125,
    padding: 14,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DFE8E2",
    color: "#24352F",
    fontSize: 15,
    lineHeight: 22,
  },
  aiSearchButton: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: "#155E59",
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  aiSearchText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  aiDisclaimer: {
    color: "#8A9993",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 17,
    marginTop: 13,
  },
  footerNote: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    padding: 13,
    borderRadius: 14,
    backgroundColor: "#E8F5EE",
  },
  footerNoteText: {
    color: "#397267",
    fontSize: 11,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    padding: 28,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  emptyTitle: {
    color: "#2E4039",
    fontSize: 16,
    fontWeight: "900",
    marginTop: 10,
  },
  emptyText: {
    color: "#7C8C85",
    fontSize: 12,
    marginTop: 6,
  },
});