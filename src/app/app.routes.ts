import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Discount } from './pages/discount/discount';
import { Analytics } from './pages/analytics/analytics';
import { Messages } from './pages/messages/messages';
import { Notifications } from './pages/notifications/notifications';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'discount', component: Discount },
    { path: 'analytics', component: Analytics },
    { path: 'messages', component: Messages },
    { path: 'notifications', component: Notifications },
    { path: 'settings', component: Settings },
];
