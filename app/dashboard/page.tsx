'use client';

// import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { CurrencyDollarIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to your personal assistant dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Finance Summary */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Monthly Budget</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">$2,500.00</div>
                    <div className="mt-1 flex items-baseline">
                      <div className="text-sm text-gray-500">$1,210.00 spent</div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <span>48% remaining</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/finance" className="font-medium text-primary-600 hover:text-primary-500">
                View finance details
              </a>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Upcoming Events</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">3 events today</div>
                    <div className="mt-1 text-sm text-gray-500">
                      <div>Team Meeting - 10:00 AM</div>
                      <div>Lunch with Client - 12:30 PM</div>
                      <div>Project Deadline - 5:00 PM</div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/schedule" className="font-medium text-primary-600 hover:text-primary-500">
                View schedule
              </a>
            </div>
          </div>
        </div>

        {/* Financial Insights */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Financial Insights</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">Spending Analysis</div>
                    <div className="mt-1 text-sm text-gray-500">
                      <div>Top category: Groceries ($320)</div>
                      <div>15% decrease from last month</div>
                      <div>2 budget alerts</div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a href="/finance/insights" className="font-medium text-primary-600 hover:text-primary-500">
                View insights
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">AI Assistant</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Ask me anything about your finances or schedule.</p>
            </div>
            <div className="mt-5">
              <div className="flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="assistant-input"
                  id="assistant-input"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="E.g., How much did I spend on dining last month?"
                />
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Ask
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
