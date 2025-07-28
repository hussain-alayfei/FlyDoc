import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  BookOpen, 
  ArrowLeft, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  User,
  Heart,
  Brain,
  Zap,
  FileCheck,
  Shield,
  Phone,
  Mail,
  MapPin,
  Thermometer,
  Activity,
  Eye,
  Headphones
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
}

interface CaseData {
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'critical';
  timestamp: Date;
  patientInfo?: string;
  id: string;
  status: 'active' | 'completed';
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'emergency' | 'assessment' | 'guidance' | 'report' | 'cases' | 'guidelines'>('home');
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: '1', name: 'صداع', icon: <Brain className="w-5 h-5" />, selected: false },
    { id: '2', name: 'إغماء', icon: <User className="w-5 h-5" />, selected: false },
    { id: '3', name: 'ضيق تنفس', icon: <Activity className="w-5 h-5" />, selected: false },
    { id: '4', name: 'آلام صدر', icon: <Heart className="w-5 h-5" />, selected: false },
    { id: '5', name: 'ارتفاع حرارة', icon: <Thermometer className="w-5 h-5" />, selected: false },
    { id: '6', name: 'دوخة', icon: <Eye className="w-5 h-5" />, selected: false },
    { id: '7', name: 'قيء', icon: <AlertTriangle className="w-5 h-5" />, selected: false },
    { id: '8', name: 'تشنجات', icon: <Zap className="w-5 h-5" />, selected: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCase, setCurrentCase] = useState<CaseData | null>(null);
  const [savedCases, setSavedCases] = useState<CaseData[]>([]);

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => prev.map(symptom => 
      symptom.id === id ? { ...symptom, selected: !symptom.selected } : symptom
    ));
  };

  const getSelectedSymptoms = () => symptoms.filter(s => s.selected);

  const assessSeverity = (): 'mild' | 'moderate' | 'critical' => {
    const selected = getSelectedSymptoms();
    const criticalSymptoms = ['إغماء', 'ضيق تنفس', 'آلام صدر', 'تشنجات'];
    
    if (selected.some(s => criticalSymptoms.includes(s.name))) return 'critical';
    if (selected.length >= 3) return 'moderate';
    return 'mild';
  };

  const startAssessment = () => {
    const selectedSymptoms = getSelectedSymptoms();
    if (selectedSymptoms.length === 0) return;
    
    const severity = assessSeverity();
    setCurrentCase({
      id: Date.now().toString(),
      symptoms: selectedSymptoms.map(s => s.name),
      severity,
      timestamp: new Date(),
      status: 'active'
    });
    setCurrentView('assessment');
  };

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveCase = (caseData: CaseData) => {
    setSavedCases(prev => [...prev, { ...caseData, status: 'completed' }]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'moderate': return 'from-orange-500 to-orange-600';
      case 'mild': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'حرجة';
      case 'moderate': return 'متوسطة';
      case 'mild': return 'بسيطة';
      default: return 'غير محدد';
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-l from-[#2a2c8b] to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between" dir="rtl">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img src="/icon.png" alt="FlyDoc" className="w-40 h-24 rounded-xl shadow-lg" />
              <div className="text-right">
                <p className="text-2xl text-blue-100">تقنية ذكية لحياة آمنة</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-right" dir="rtl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            مساعدك الذكي لطيران آمن
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تقنية متطورة تضمن سلامة الركاب وتدعم طاقم الطائرة في اتخاذ القرارات الطبية الصحيحة
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <button
            onClick={() => setCurrentView('emergency')}
            className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Plus className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">بدء حالة طارئة</h3>
                <p className="text-red-100">لبدء تشخيص جديد لحالة صحية لراكب</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('cases')}
            className="group bg-gradient-to-r from-[#2a2c8b] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">سجل الحالات</h3>
                <p className="text-blue-100">لمراجعة الحالات السابقة أو الجارية</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('guidelines')}
            className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">الإرشادات الطبية السريعة</h3>
                <p className="text-emerald-100">دليل طبي مختصر للمواقف الشائعة</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              window.open('https://beamish-cat-df48eb.netlify.app/', '_blank');
            }}
            className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Brain className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">المساعد الذكي</h3>
                <p className="text-purple-100">مساعد ذكي متطور للاستشارات الطبية</p>
              </div>
            </div>
          </button>
        </div>

        {/* Platform Features - Circular Flow */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">مميزات المنصة</h3>
          <div className="relative max-w-6xl mx-auto" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">ذكاء اصطناعي متقدم</h4>
                <p className="text-gray-600 leading-relaxed">تحليل دقيق للأعراض وتشخيص فوري باستخدام أحدث تقنيات الذكاء الاصطناعي</p>
              </div>

              {/* Feature 2 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">استجابة فورية</h4>
                <p className="text-gray-600 leading-relaxed">إرشادات لحظية تحت الضغط مع توجيهات واضحة ومحددة</p>
              </div>

              {/* Feature 3 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <FileCheck className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">تقارير تلقائية</h4>
                <p className="text-gray-600 leading-relaxed">توثيق شامل للحالات الطبية مع تقارير مفصلة للأطباء</p>
              </div>

              {/* Feature 4 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">بروتوكولات معتمدة</h4>
                <p className="text-gray-600 leading-relaxed">إرشادات طبية موثوقة ومحدثة وفقاً للمعايير الدولية</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why FlyDoc - Simplified */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-20" dir="rtl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">لماذا FlyDoc؟</h3>
          <div className="max-w-4xl mx-auto text-right">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              يقلل الأخطاء البشرية بنسبة 80% ويحسن زمن الاستجابة للحالات الطارئة. يدعم متعدد اللغات مع تكامل كامل مع أنظمة الطوارئ الأرضية. واجهة بديهية مصممة للاستخدام تحت الضغط مع تحديثات مستمرة للبروتوكولات الطبية.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2a2c8b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">FlyDoc</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              مساعد طبي ذكي يضمن سلامة الركاب ويدعم طاقم الطائرة في الحالات الطارئة
            </p>
            <div className="flex items-center justify-center space-x-6 space-x-reverse mb-6">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-5 h-5 text-blue-300" />
                <span className="text-blue-100">0509264912</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-5 h-5 text-blue-300" />
                <span className="text-blue-100">info@flydoc.sa</span>
              </div>
            </div>
            <div className="border-t border-blue-700 pt-6">
              <p className="text-blue-200">© 2024 FlyDoc. جميع الحقوق محفوظة</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const renderEmergency = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-[#2a2c8b] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </button>
            <h1 className="text-xl font-bold text-[#2a2c8b]">حالة طارئة جديدة</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center text-right">
            ما الذي يعاني منه الراكب؟
          </h2>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن الأعراض..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2a2c8b] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {filteredSymptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                  symptom.selected
                    ? 'border-[#2a2c8b] bg-blue-50 text-[#2a2c8b]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                } space-x-reverse`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  symptom.selected ? 'bg-[#2a2c8b] text-white' : 'bg-gray-100'
                }`}>
                  {symptom.icon}
                </div>
                <span className="font-medium">{symptom.name}</span>
                {symptom.selected && <CheckCircle className="w-5 h-5 text-[#2a2c8b] mr-auto" />}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={startAssessment}
              disabled={getSelectedSymptoms().length === 0}
              className="bg-gradient-to-r from-[#2a2c8b] to-blue-600 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed"
            >
              بدء التقييم الطبي
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGuidelines = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-[#2a2c8b] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </button>
            <h1 className="text-xl font-bold text-[#2a2c8b]">الإرشادات الطبية السريعة</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Emergency Protocols */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 text-right">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">حالات الطوارئ الحرجة</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>فقدان الوعي - فحص النبض والتنفس</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>ضيق التنفس - توفير الأوكسجين</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>آلام الصدر - وضعية الجلوس</span>
              </li>
            </ul>
          </div>

          {/* Common Symptoms */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 text-right">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">الأعراض الشائعة</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>الغثيان والقيء - كيس القيء</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>الصداع - مسكنات آمنة</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>الدوخة - وضعية الاستلقاء</span>
              </li>
            </ul>
          </div>

          {/* First Aid */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 text-right">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">الإسعافات الأولية</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>الإنعاش القلبي الرئوي</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>استخدام مزيل الرجفان</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>إيقاف النزيف</span>
              </li>
            </ul>
          </div>

          {/* Medications */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 text-right">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">الأدوية المتاحة</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>مسكنات الألم الآمنة</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>أدوية الحساسية</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>أدوية القلب الطارئة</span>
              </li>
            </ul>
          </div>

          {/* Communication */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 text-right">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">التواصل</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>إبلاغ القبطان فوراً</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>التواصل مع المراقبة الجوية</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>تحضير تقرير طبي</span>
              </li>
            </ul>
          </div>

          {/* Documentation */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4 text-right">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">التوثيق</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>تسجيل الأعراض والعلامات</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>توثيق الإجراءات المتخذة</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0 ml-2"></div>
                <span>تحديد الوقت والتاريخ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => {
    if (!currentCase) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('emergency')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#2a2c8b] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>رجوع</span>
              </button>
              <h1 className="text-xl font-bold text-[#2a2c8b]">التقييم الطبي الأولي</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${getSeverityColor(currentCase.severity)} text-white font-semibold text-lg mb-4`}>
                <AlertTriangle className="w-6 h-6 mr-2" />
                حالة {getSeverityText(currentCase.severity)}
              </div>
              <p className="text-gray-600">تم تحليل الأعراض وتحديد مستوى الخطورة</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">الأعراض المحددة</h3>
                <ul className="space-y-2">
                  {currentCase.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">معلومات الحالة</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      {currentCase.timestamp.toLocaleTimeString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">راكب - مقعد غير محدد</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentView('guidance')}
                className="bg-gradient-to-r from-[#2a2c8b] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                عرض الإرشادات
              </button>
              <button
                onClick={() => setCurrentView('report')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                إنشاء تقرير
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGuidance = () => {
    if (!currentCase) return null;

    const getGuidanceSteps = () => {
      const criticalSymptoms = ['إغماء', 'ضيق تنفس', 'آلام صدر', 'تشنجات'];
      const hasCritical = currentCase.symptoms.some(s => criticalSymptoms.includes(s));

      if (hasCritical) {
        return [
          'تأكد من سلامة المجرى التنفسي',
          'فحص النبض والتنفس',
          'توفير الأوكسجين إذا كان متاحاً',
          'إبلاغ القبطان فوراً',
          'تحضير للهبوط الاضطراري إذا لزم الأمر',
          'مراقبة العلامات الحيوية باستمرار'
        ];
      } else {
        return [
          'طمأنة المريض والحفاظ على هدوئه',
          'وضع المريض في وضعية مريحة',
          'مراقبة الأعراض وتطورها',
          'توفير الماء إذا كان المريض واعياً',
          'تسجيل الأعراض والوقت',
          'إبلاغ القبطان بالحالة'
        ];
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('assessment')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#2a2c8b] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>رجوع</span>
              </button>
              <h1 className="text-xl font-bold text-[#2a2c8b]">الإرشاد الطبي اللحظي</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                إرشادات خطوة بخطوة
              </h2>
              <p className="text-gray-600">اتبع هذه الخطوات بعناية للتعامل مع الحالة</p>
            </div>

            <div className="space-y-4 mb-8">
              {getGuidanceSteps().map((step, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#2a2c8b] to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{step}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-800 mb-2">تنبيه مهم</h3>
                  <p className="text-yellow-700">
                    إذا تدهورت حالة المريض أو ظهرت أعراض جديدة، أعد التقييم فوراً وأبلغ القبطان
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentView('report')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                إنشاء تقرير طبي
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                إنهاء الحالة
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    if (!currentCase) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('guidance')}
                className="flex items-center space-x-2 text-gray-600 hover:text-[#2a2c8b] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>رجوع</span>
              </button>
              <h1 className="text-xl font-bold text-[#2a2c8b]">التقرير الطبي</h1>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                تقرير طبي - حالة طوارئ جوية
              </h2>
              <p className="text-gray-600">تم إنشاء هذا التقرير تلقائياً بواسطة FlyDoc</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">معلومات الرحلة</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">التاريخ:</span> {currentCase.timestamp.toLocaleDateString('ar-SA')}</p>
                    <p><span className="font-medium">الوقت:</span> {currentCase.timestamp.toLocaleTimeString('ar-SA')}</p>
                    <p><span className="font-medium">رقم الرحلة:</span> SV123</p>
                    <p><span className="font-medium">الطائرة:</span> Boeing 777</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">معلومات المريض</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">العمر:</span> غير محدد</p>
                    <p><span className="font-medium">الجنس:</span> غير محدد</p>
                    <p><span className="font-medium">المقعد:</span> غير محدد</p>
                    <p><span className="font-medium">الحالة:</span> واعي ومتجاوب</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">الأعراض المسجلة</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {currentCase.symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">التقييم والإجراءات</h3>
                <div className="space-y-3 text-sm">
                  <p><span className="font-medium">مستوى الخطورة:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                      currentCase.severity === 'critical' ? 'bg-red-500' :
                      currentCase.severity === 'moderate' ? 'bg-orange-500' : 'bg-green-500'
                    }`}>
                      {currentCase.severity === 'critical' ? 'حرجة' :
                       currentCase.severity === 'moderate' ? 'متوسطة' : 'بسيطة'}
                    </span>
                  </p>
                  <p><span className="font-medium">الإجراءات المتخذة:</span> تم اتباع البروتوكول الطبي المعتمد</p>
                  <p><span className="font-medium">التوصيات:</span> مراقبة مستمرة للحالة</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-3">ملاحظات للفريق الطبي الأرضي</h3>
                <p className="text-blue-800 text-sm">
                  تم التعامل مع الحالة وفقاً للبروتوكولات الطبية المعتمدة. يُنصح بإجراء فحص طبي شامل عند الوصول.
                  جميع الأعراض والإجراءات موثقة في هذا التقرير.
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => {
                  // Simulate sending report
                  if (currentCase) {
                    saveCase(currentCase);
                  }
                  alert('تم إرسال التقرير إلى الفريق الطبي الأرضي');
                  setCurrentView('home');
                }}
                className="bg-gradient-to-r from-[#2a2c8b] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                إرسال التقرير
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                طباعة التقرير
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCases = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#2a2c8b] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </button>
            <h1 className="text-xl font-bold text-[#2a2c8b]">سجل الحالات الطبية</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        {savedCases.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد حالات مسجلة</h3>
              <p className="text-gray-600 mb-6">ستظهر هنا جميع الحالات الطبية التي تم التعامل معها</p>
              <button
                onClick={() => setCurrentView('emergency')}
                className="bg-gradient-to-r from-[#2a2c8b] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                بدء حالة جديدة
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">الحالات المسجلة ({savedCases.length})</h2>
              <button
                onClick={() => setCurrentView('emergency')}
                className="bg-gradient-to-r from-[#2a2c8b] to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 space-x-reverse"
              >
                <Plus className="w-5 h-5" />
                <span>حالة جديدة</span>
              </button>
            </div>

            <div className="grid gap-6">
              {savedCases.map((medicalCase) => (
                <div key={medicalCase.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getSeverityColor(medicalCase.severity)} rounded-xl flex items-center justify-center`}>
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">حالة {getSeverityText(medicalCase.severity)}</h3>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{medicalCase.timestamp.toLocaleDateString('ar-SA')}</span>
                          <span>{medicalCase.timestamp.toLocaleTimeString('ar-SA')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        مكتملة
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">الأعراض المسجلة:</h4>
                    <div className="flex flex-wrap gap-2">
                      {medicalCase.symptoms.map((symptom, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>راكب - مقعد غير محدد</span>
                    </div>
                    <button className="text-[#2a2c8b] hover:text-blue-700 font-medium text-sm transition-colors">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render current view
  switch (currentView) {
    case 'emergency':
      return renderEmergency();
    case 'assessment':
      return renderAssessment();
    case 'guidance':
      return renderGuidance();
    case 'report':
      return renderReport();
    case 'cases':
      return renderCases();
    case 'guidelines':
      return renderGuidelines();
    default:
      return renderHome();
  }
}

export default App;