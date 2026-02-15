import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  ArrowLeft, ChevronRight, Circle, CheckCircle2, Calendar as CalendarIcon,
  ChevronLeft, Bell, Clock, StickyNote, CloudRain, Droplets, TrendingUp,
  Plus, X, AlertCircle
} from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface CropCalendarProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

interface CalendarTask {
  weekEn: string;
  weekHi: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  priority: 'high' | 'medium' | 'low';
}

interface MonthData {
  monthEn: string;
  monthHi: string;
  season: string;
  seasonHi: string;
  tasks: CalendarTask[];
}

interface DayNote {
  date: string;
  note: string;
}

const cropCalendars: Record<string, MonthData[]> = {
  "Rice (Paddy)": [
    {
      monthEn: "June", monthHi: "जून", season: "Kharif Start", seasonHi: "खरीफ शुरू",
      tasks: [
        { weekEn: "Week 1-2", weekHi: "सप्ताह 1-2", titleEn: "Land Preparation", titleHi: "भूमि तैयारी", descEn: "Deep plowing and leveling", descHi: "गहरी जुताई और समतलीकरण", priority: "high" },
        { weekEn: "Week 3-4", weekHi: "सप्ताह 3-4", titleEn: "Nursery Sowing", titleHi: "नर्सरी बुवाई", descEn: "Sow paddy seeds in nursery", descHi: "नर्सरी में धान के बीज बोएं", priority: "high" }
      ]
    },
    {
      monthEn: "July", monthHi: "जुलाई", season: "Transplanting", seasonHi: "रोपाई",
      tasks: [
        { weekEn: "Week 1-2", weekHi: "सप्ताह 1-2", titleEn: "Transplanting", titleHi: "रोपाई", descEn: "Transplant seedlings to main field", descHi: "मुख्य खेत में पौध रोपें", priority: "high" },
        { weekEn: "Week 3-4", weekHi: "सप्ताह 3-4", titleEn: "Basal Fertilizer", titleHi: "बेसल खाद", descEn: "Apply DAP and Urea", descHi: "DAP और यूरिया डालें", priority: "high" }
      ]
    },
    {
      monthEn: "August", monthHi: "अगस्त", season: "Growth Stage", seasonHi: "वृद्धि चरण",
      tasks: [
        { weekEn: "Week 1", weekHi: "सप्ताह 1", titleEn: "Pest Check", titleHi: "कीट जांच", descEn: "Monitor for stem borer", descHi: "तना छेदक की जांच करें", priority: "high" },
        { weekEn: "Week 2-3", weekHi: "सप्ताह 2-3", titleEn: "Top Dressing", titleHi: "टॉप ड्रेसिंग", descEn: "Apply Urea after 30 days", descHi: "30 दिन बाद यूरिया डालें", priority: "medium" }
      ]
    },
    {
      monthEn: "September", monthHi: "सितंबर", season: "Flowering", seasonHi: "फूल आना",
      tasks: [
        { weekEn: "Week 1-2", weekHi: "सप्ताह 1-2", titleEn: "Critical Irrigation", titleHi: "महत्वपूर्ण सिंचाई", descEn: "Never let field dry", descHi: "खेत सूखने न दें", priority: "high" }
      ]
    },
    {
      monthEn: "October", monthHi: "अक्टूबर", season: "Harvest Time", seasonHi: "कटाई का समय",
      tasks: [
        { weekEn: "Week 3-4", weekHi: "सप्ताह 3-4", titleEn: "Harvest", titleHi: "कटाई", descEn: "Harvest when 80% grains turn yellow", descHi: "80% दाने पीले होने पर काटें", priority: "high" }
      ]
    }
  ],
  "Wheat": [
    {
      monthEn: "November", monthHi: "नवंबर", season: "Sowing Season", seasonHi: "बुवाई का मौसम",
      tasks: [
        { weekEn: "Week 1-2", weekHi: "सप्ताह 1-2", titleEn: "Sow Seeds", titleHi: "बुवाई", descEn: "Sow wheat seeds", descHi: "गेहूं बीज बोएं", priority: "high" },
        { weekEn: "Week 3-4", weekHi: "सप्ताह 3-4", titleEn: "First Irrigation", titleHi: "पहली सिंचाई", descEn: "Crown root irrigation", descHi: "क्राउन रूट सिंचाई", priority: "high" }
      ]
    },
    {
      monthEn: "December", monthHi: "दिसंबर", season: "Tillering", seasonHi: "कल्ले फूटना",
      tasks: [
        { weekEn: "Week 1-2", weekHi: "सप्ताह 1-2", titleEn: "Apply Urea", titleHi: "यूरिया डालें", descEn: "Top dress with Urea", descHi: "यूरिया छिड़कें", priority: "high" }
      ]
    },
    {
      monthEn: "March", monthHi: "मार्च", season: "Grain Filling", seasonHi: "दाना भरना",
      tasks: [
        { weekEn: "Week 3-4", weekHi: "सप्ताह 3-4", titleEn: "Prepare Harvest", titleHi: "कटाई तैयारी", descEn: "Arrange harvester", descHi: "हार्वेस्टर का इंतज़ाम करें", priority: "high" }
      ]
    },
    {
      monthEn: "April", monthHi: "अप्रैल", season: "Harvest Time", seasonHi: "कटाई का समय",
      tasks: [
        { weekEn: "Week 1-2", weekHi: "सप्ताह 1-2", titleEn: "Harvest", titleHi: "कटाई", descEn: "Harvest wheat crop", descHi: "गेहूं काटें", priority: "high" }
      ]
    }
  ],
  "Sugarcane": [
    {
      monthEn: "February", monthHi: "फरवरी", season: "Planting", seasonHi: "रोपण",
      tasks: [
        { weekEn: "Week 1-4", weekHi: "सप्ताह 1-4", titleEn: "Plant Setts", titleHi: "बुवाई", descEn: "Plant sugarcane setts", descHi: "गन्ने की बुवाई करें", priority: "high" }
      ]
    },
    {
      monthEn: "March-May", monthHi: "मार्च-मई", season: "Growth", seasonHi: "वृद्धि",
      tasks: [
        { weekEn: "Regular", weekHi: "नियमित", titleEn: "Irrigation", titleHi: "सिंचाई", descEn: "Regular irrigation needed", descHi: "नियमित सिंचाई आवश्यक", priority: "high" }
      ]
    }
  ]
};

const defaultCalendar: MonthData[] = [
  {
    monthEn: "General Guide", monthHi: "सामान्य गाइड", season: "Planning", seasonHi: "योजना",
    tasks: [
      { weekEn: "Before Sowing", weekHi: "बुवाई से पहले", titleEn: "Prepare Land", titleHi: "भूमि तैयारी", descEn: "Plow and level field", descHi: "जुताई और समतलीकरण", priority: "high" },
      { weekEn: "At Sowing", weekHi: "बुवाई के समय", titleEn: "Use Certified Seeds", titleHi: "प्रमाणित बीज", descEn: "Use certified seeds", descHi: "प्रमाणित बीज उपयोग करें", priority: "high" }
    ]
  }
];

export default function CropCalendar({ farmerData, language }: CropCalendarProps) {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayNotes, setDayNotes] = useState<Record<string, DayNote>>({});
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [view, setView] = useState<'calendar' | 'tasks'>('tasks');
  
  const calendar = cropCalendars[farmerData.crop] || defaultCalendar;
  const totalTasks = calendar.reduce((sum, m) => sum + m.tasks.length, 0);
  const doneTasks = completedTasks.size;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const toggleTask = (monthIdx: number, taskIdx: number) => {
    const taskId = `${monthIdx}-${taskIdx}`;
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getDayStatus = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateStr = formatDate(date);
    const hasNote = dayNotes[dateStr];
    const hasTask = completedTasks.has(dateStr);
    return { hasNote, hasTask };
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    const dateStr = formatDate(date);
    setNoteText(dayNotes[dateStr]?.note || "");
    setShowNoteModal(true);
  };

  const saveNote = () => {
    if (selectedDate && noteText.trim()) {
      const dateStr = formatDate(selectedDate);
      setDayNotes(prev => ({
        ...prev,
        [dateStr]: { date: dateStr, note: noteText.trim() }
      }));
    }
    setShowNoteModal(false);
    setNoteText("");
  };

  const deleteNote = () => {
    if (selectedDate) {
      const dateStr = formatDate(selectedDate);
      setDayNotes(prev => {
        const next = { ...prev };
        delete next[dateStr];
        return next;
      });
    }
    setShowNoteModal(false);
    setNoteText("");
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const monthNames = language === 'en' 
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];

  const dayNamesShort = language === 'en' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold flex-1">
            {language === 'en' ? 'Crop Calendar' : 'फसल कैलेंडर'}
          </h1>
          <button
            onClick={() => setView(view === 'calendar' ? 'tasks' : 'calendar')}
            className="p-2 bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
          >
            {view === 'calendar' ? <Clock className="w-5 h-5" /> : <CalendarIcon className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-sm text-emerald-100 ml-14">
          {farmerData.crop} {language === 'en' ? 'season guide' : 'सीजन गाइड'}
        </p>
      </header>

      <div className="px-4 py-4">
        {/* Calendar View - Now at Top */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 overflow-hidden mb-4">
          {/* Calendar Header */}
          <div className="bg-emerald-50 border-b-2 border-emerald-200 px-4 py-3 flex items-center justify-between">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-emerald-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h3 className="font-extrabold text-gray-900 text-lg">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-emerald-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Day names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNamesShort.map(day => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const { hasNote, hasTask } = getDayStatus(day);
                const isToday = isCurrentMonth && day === today.getDate();

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all relative ${
                      isToday 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : hasNote || hasTask
                        ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <span>{day}</span>
                    {(hasNote || hasTask) && (
                      <div className="absolute bottom-1 flex gap-0.5">
                        {hasNote && <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-emerald-600'}`} />}
                        {hasTask && <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-blue-500'}`} />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="border-t-2 border-gray-100 px-4 py-3 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-gray-600">{language === 'en' ? 'Today' : 'आज'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-gray-600">{language === 'en' ? 'Note' : 'नोट'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-600">{language === 'en' ? 'Task' : 'कार्य'}</span>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 font-bold mb-1">{language === 'en' ? 'Season Progress' : 'सीजन प्रगति'}</p>
              <p className="text-3xl font-extrabold text-emerald-600">{progress}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">{language === 'en' ? 'Tasks Completed' : 'कार्य पूर्ण'}</p>
              <p className="text-2xl font-extrabold text-gray-900">{doneTasks}/{totalTasks}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-emerald-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 border-2 border-gray-200 text-center">
            <CloudRain className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-500 mb-0.5">{language === 'en' ? 'Next Rain' : 'अगली बारिश'}</p>
            <p className="text-sm font-extrabold text-gray-900">2 days</p>
          </div>
          <div className="bg-white rounded-xl p-3 border-2 border-gray-200 text-center">
            <Droplets className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-xs text-gray-500 mb-0.5">{language === 'en' ? 'Irrigation' : 'सिंचाई'}</p>
            <p className="text-sm font-extrabold text-gray-900">Tomorrow</p>
          </div>
          <div className="bg-white rounded-xl p-3 border-2 border-gray-200 text-center">
            <Bell className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-xs text-gray-500 mb-0.5">{language === 'en' ? 'Reminders' : 'रिमाइंडर'}</p>
            <p className="text-sm font-extrabold text-gray-900">{Object.keys(dayNotes).length}</p>
          </div>
        </div>

        {view === 'calendar' ? (
          <>

            {/* Recent Notes */}
            {Object.keys(dayNotes).length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-4">
                <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
                  <StickyNote className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Recent Notes' : 'हाल के नोट'}
                </h3>
                <div className="space-y-2">
                  {Object.values(dayNotes).slice(-3).reverse().map((note, idx) => (
                    <div key={idx} className="bg-emerald-50 rounded-xl p-3 border-2 border-emerald-200">
                      <p className="text-xs text-gray-500 mb-1 font-bold">{note.date}</p>
                      <p className="text-sm text-gray-700">{note.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Tasks View */}
            <div className="space-y-3">
              {calendar.map((month, monthIdx) => (
                <div key={monthIdx} className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 overflow-hidden">
                  {/* Month Header */}
                  <div className="bg-emerald-50 border-b-2 border-emerald-200 px-4 py-3">
                    <h3 className="font-extrabold text-gray-900">
                      {language === 'en' ? month.monthEn : month.monthHi}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold">
                      {language === 'en' ? month.season : month.seasonHi}
                    </p>
                  </div>

                  {/* Tasks List */}
                  <div className="p-4 space-y-2">
                    {month.tasks.map((task, taskIdx) => {
                      const taskId = `${monthIdx}-${taskIdx}`;
                      const isDone = completedTasks.has(taskId);

                      return (
                        <button
                          key={taskIdx}
                          onClick={() => toggleTask(monthIdx, taskIdx)}
                          className={`w-full text-left rounded-xl p-3 border-2 transition-all ${
                            isDone 
                              ? 'border-emerald-500 bg-emerald-50' 
                              : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h4 className={`font-extrabold ${isDone ? 'text-emerald-700 line-through' : 'text-gray-900'}`}>
                                    {language === 'en' ? task.titleEn : task.titleHi}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-0.5 font-bold">
                                    {language === 'en' ? task.weekEn : task.weekHi}
                                  </p>
                                </div>
                                {task.priority === 'high' && !isDone && (
                                  <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-extrabold flex-shrink-0 border border-amber-300">
                                    {language === 'en' ? 'High' : 'उच्च'}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm mt-2 leading-relaxed ${isDone ? 'text-gray-500' : 'text-gray-700'}`}>
                                {language === 'en' ? task.descEn : task.descHi}
                              </p>
                            </div>

                            <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 ${isDone ? 'text-emerald-600' : 'text-gray-400'}`} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tips Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5 mt-4">
          <h3 className="font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-emerald-600" />
            {language === 'en' ? 'Quick Tips' : 'त्वरित सुझाव'}
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{language === 'en' ? 'Tap tasks to mark as complete' : 'कार्य पूर्ण करने के लिए टैप करें'}</span>
            </li>
            <li className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{language === 'en' ? 'Click calendar dates to add notes' : 'नोट जोड़ने के लिए तारीख पर क्लिक करें'}</span>
            </li>
            <li className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{language === 'en' ? 'Check weather before irrigation' : 'सिंचाई से पहले मौसम देखें'}</span>
            </li>
            <li className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>{language === 'en' ? 'Follow high priority tasks first' : 'उच्च प्राथमिकता कार्य पहले करें'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4 sm:items-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-slide-up">
            <div className="border-b-2 border-gray-200 px-5 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">
                  {language === 'en' ? 'Add Note' : 'नोट जोड़ें'}
                </h3>
                <p className="text-sm text-gray-500 font-bold">
                  {formatDate(selectedDate)}
                </p>
              </div>
              <button onClick={() => setShowNoteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-5">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={language === 'en' ? 'Enter your note here...' : 'अपना नोट यहाँ लिखें...'}
                className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm focus:border-emerald-500 focus:outline-none min-h-[120px] resize-none"
              />
              
              <div className="flex gap-2 mt-4">
                {dayNotes[formatDate(selectedDate)] && (
                  <button
                    onClick={deleteNote}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-all"
                  >
                    {language === 'en' ? 'Delete' : 'हटाएं'}
                  </button>
                )}
                <button
                  onClick={saveNote}
                  disabled={!noteText.trim()}
                  className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all shadow-sm"
                >
                  {language === 'en' ? 'Save Note' : 'नोट सेव करें'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav language={language} currentPage="home" />
    </div>
  );
}
