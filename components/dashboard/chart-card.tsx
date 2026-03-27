"use client"

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

interface ChartCardProps {
  title: string
  subtitle?: string
  data: Array<{ name: string; value: number; value2?: number }>
  type?: "line" | "area"
  showSecondLine?: boolean
}

export function ChartCard({ 
  title, 
  subtitle, 
  data, 
  type = "area",
  showSecondLine = false 
}: ChartCardProps) {
  return (
    <div className="rounded-[20px] bg-card p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A7D7A0" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A7D7A0" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#CFEFFF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#CFEFFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: '#ffffff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#A7D7A0" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
              {showSecondLine && (
                <Area 
                  type="monotone" 
                  dataKey="value2" 
                  stroke="#CFEFFF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue2)" 
                />
              )}
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: '#ffffff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#A7D7A0" 
                strokeWidth={3}
                dot={false}
              />
              {showSecondLine && (
                <Line 
                  type="monotone" 
                  dataKey="value2" 
                  stroke="#CFEFFF" 
                  strokeWidth={3}
                  dot={false}
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
