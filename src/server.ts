/**
 * Shared MCP Server — used by both Node.js (index.ts) and CF Worker (worker.ts)
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { CalendarClient } from './calendar-client.js';
import { TOOLS } from './tools.js';

export interface CalendarMcpConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export function handleToolCall(
  toolName: string,
  args: Record<string, unknown>,
  client: CalendarClient
) {
  switch (toolName) {
    // ========== Events ==========
    case 'gcal_list_events':
      return client.listEvents({
        calendarId: args.calendar_id as string,
        timeMin: args.time_min as string | undefined,
        timeMax: args.time_max as string | undefined,
        q: args.q as string | undefined,
        maxResults: args.max_results as number | undefined,
        pageToken: args.page_token as string | undefined,
        singleEvents: args.single_events as boolean | undefined,
        orderBy: args.order_by as string | undefined,
        timeZone: args.time_zone as string | undefined,
        showDeleted: args.show_deleted as boolean | undefined,
      });
    case 'gcal_get_event':
      return client.getEvent({
        calendarId: args.calendar_id as string,
        eventId: args.event_id as string,
        timeZone: args.time_zone as string | undefined,
      });
    case 'gcal_create_event':
      return client.createEvent({
        calendarId: args.calendar_id as string,
        summary: args.summary as string | undefined,
        description: args.description as string | undefined,
        location: args.location as string | undefined,
        startDateTime: args.start_date_time as string | undefined,
        startDate: args.start_date as string | undefined,
        startTimeZone: args.start_time_zone as string | undefined,
        endDateTime: args.end_date_time as string | undefined,
        endDate: args.end_date as string | undefined,
        endTimeZone: args.end_time_zone as string | undefined,
        attendees: args.attendees as string[] | undefined,
        recurrence: args.recurrence as string[] | undefined,
        colorId: args.color_id as string | undefined,
        visibility: args.visibility as string | undefined,
        transparency: args.transparency as string | undefined,
        sendUpdates: args.send_updates as string | undefined,
      });
    case 'gcal_update_event':
      return client.updateEvent({
        calendarId: args.calendar_id as string,
        eventId: args.event_id as string,
        summary: args.summary as string | undefined,
        description: args.description as string | undefined,
        location: args.location as string | undefined,
        startDateTime: args.start_date_time as string | undefined,
        startDate: args.start_date as string | undefined,
        startTimeZone: args.start_time_zone as string | undefined,
        endDateTime: args.end_date_time as string | undefined,
        endDate: args.end_date as string | undefined,
        endTimeZone: args.end_time_zone as string | undefined,
        attendees: args.attendees as string[] | undefined,
        recurrence: args.recurrence as string[] | undefined,
        colorId: args.color_id as string | undefined,
        visibility: args.visibility as string | undefined,
        transparency: args.transparency as string | undefined,
        sendUpdates: args.send_updates as string | undefined,
      });
    case 'gcal_patch_event':
      return client.patchEvent({
        calendarId: args.calendar_id as string,
        eventId: args.event_id as string,
        summary: args.summary as string | undefined,
        description: args.description as string | undefined,
        location: args.location as string | undefined,
        startDateTime: args.start_date_time as string | undefined,
        startDate: args.start_date as string | undefined,
        startTimeZone: args.start_time_zone as string | undefined,
        endDateTime: args.end_date_time as string | undefined,
        endDate: args.end_date as string | undefined,
        endTimeZone: args.end_time_zone as string | undefined,
        attendees: args.attendees as string[] | undefined,
        colorId: args.color_id as string | undefined,
        visibility: args.visibility as string | undefined,
        transparency: args.transparency as string | undefined,
        sendUpdates: args.send_updates as string | undefined,
      });
    case 'gcal_delete_event':
      return client.deleteEvent({
        calendarId: args.calendar_id as string,
        eventId: args.event_id as string,
        sendUpdates: args.send_updates as string | undefined,
      });
    case 'gcal_quick_add':
      return client.quickAdd({
        calendarId: args.calendar_id as string,
        text: args.text as string,
        sendUpdates: args.send_updates as string | undefined,
      });
    case 'gcal_move_event':
      return client.moveEvent({
        calendarId: args.calendar_id as string,
        eventId: args.event_id as string,
        destination: args.destination as string,
        sendUpdates: args.send_updates as string | undefined,
      });
    case 'gcal_list_instances':
      return client.listInstances({
        calendarId: args.calendar_id as string,
        eventId: args.event_id as string,
        timeMin: args.time_min as string | undefined,
        timeMax: args.time_max as string | undefined,
        maxResults: args.max_results as number | undefined,
        pageToken: args.page_token as string | undefined,
        timeZone: args.time_zone as string | undefined,
      });
    case 'gcal_import_event':
      return client.importEvent({
        calendarId: args.calendar_id as string,
        iCalUID: args.ical_uid as string,
        summary: args.summary as string | undefined,
        description: args.description as string | undefined,
        location: args.location as string | undefined,
        startDateTime: args.start_date_time as string | undefined,
        startDate: args.start_date as string | undefined,
        startTimeZone: args.start_time_zone as string | undefined,
        endDateTime: args.end_date_time as string | undefined,
        endDate: args.end_date as string | undefined,
        endTimeZone: args.end_time_zone as string | undefined,
      });

    // ========== CalendarList ==========
    case 'gcal_list_calendars':
      return client.listCalendars({
        maxResults: args.max_results as number | undefined,
        pageToken: args.page_token as string | undefined,
        showDeleted: args.show_deleted as boolean | undefined,
        showHidden: args.show_hidden as boolean | undefined,
      });
    case 'gcal_get_calendar_entry':
      return client.getCalendarEntry({
        calendarId: args.calendar_id as string,
      });
    case 'gcal_add_calendar':
      return client.addCalendar({
        id: args.id as string,
        colorId: args.color_id as string | undefined,
        summaryOverride: args.summary_override as string | undefined,
        hidden: args.hidden as boolean | undefined,
        selected: args.selected as boolean | undefined,
      });
    case 'gcal_update_calendar_entry':
      return client.updateCalendarEntry({
        calendarId: args.calendar_id as string,
        colorId: args.color_id as string | undefined,
        summaryOverride: args.summary_override as string | undefined,
        hidden: args.hidden as boolean | undefined,
        selected: args.selected as boolean | undefined,
        defaultReminders: args.default_reminders as { method: string; minutes: number }[] | undefined,
      });
    case 'gcal_remove_calendar':
      return client.removeCalendar({
        calendarId: args.calendar_id as string,
      });

    // ========== Calendars ==========
    case 'gcal_get_calendar':
      return client.getCalendar({
        calendarId: args.calendar_id as string,
      });
    case 'gcal_create_calendar':
      return client.createCalendar({
        summary: args.summary as string,
        description: args.description as string | undefined,
        location: args.location as string | undefined,
        timeZone: args.time_zone as string | undefined,
      });
    case 'gcal_update_calendar':
      return client.updateCalendar({
        calendarId: args.calendar_id as string,
        summary: args.summary as string | undefined,
        description: args.description as string | undefined,
        location: args.location as string | undefined,
        timeZone: args.time_zone as string | undefined,
      });
    case 'gcal_delete_calendar':
      return client.deleteCalendar({
        calendarId: args.calendar_id as string,
      });
    case 'gcal_clear_calendar':
      return client.clearCalendar({
        calendarId: args.calendar_id as string,
      });

    // ========== ACL ==========
    case 'gcal_list_acl':
      return client.listAcl({
        calendarId: args.calendar_id as string,
        maxResults: args.max_results as number | undefined,
        pageToken: args.page_token as string | undefined,
        showDeleted: args.show_deleted as boolean | undefined,
      });
    case 'gcal_get_acl':
      return client.getAcl({
        calendarId: args.calendar_id as string,
        ruleId: args.rule_id as string,
      });
    case 'gcal_create_acl':
      return client.createAcl({
        calendarId: args.calendar_id as string,
        role: args.role as string,
        scopeType: args.scope_type as string,
        scopeValue: args.scope_value as string | undefined,
        sendNotifications: args.send_notifications as boolean | undefined,
      });
    case 'gcal_update_acl':
      return client.updateAcl({
        calendarId: args.calendar_id as string,
        ruleId: args.rule_id as string,
        role: args.role as string,
        sendNotifications: args.send_notifications as boolean | undefined,
      });
    case 'gcal_delete_acl':
      return client.deleteAcl({
        calendarId: args.calendar_id as string,
        ruleId: args.rule_id as string,
      });

    // ========== Utility ==========
    case 'gcal_query_freebusy':
      return client.queryFreeBusy({
        timeMin: args.time_min as string,
        timeMax: args.time_max as string,
        timeZone: args.time_zone as string | undefined,
        calendarIds: args.calendar_ids as string[],
      });
    case 'gcal_get_colors':
      return client.getColors();
    case 'gcal_list_settings':
      return client.listSettings({
        maxResults: args.max_results as number | undefined,
        pageToken: args.page_token as string | undefined,
      });

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

export function createServer(config?: CalendarMcpConfig) {
  const server = new McpServer({
    name: 'google-calendar-mcp',
    version: '1.0.0',
  });

  let client: CalendarClient | null = null;

  for (const tool of TOOLS) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema as any,
        annotations: tool.annotations,
      },
      async (args: Record<string, unknown>) => {
        const clientId =
          config?.clientId ||
          (args as Record<string, unknown>).GOOGLE_CLIENT_ID as string;
        const clientSecret =
          config?.clientSecret ||
          (args as Record<string, unknown>).GOOGLE_CLIENT_SECRET as string;
        const refreshToken =
          config?.refreshToken ||
          (args as Record<string, unknown>).GOOGLE_REFRESH_TOKEN as string;

        if (!clientId || !clientSecret || !refreshToken) {
          return {
            content: [{ type: 'text' as const, text: 'Error: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN are all required.' }],
            isError: true,
          };
        }

        if (!client || config?.clientId !== clientId) {
          client = new CalendarClient({ clientId, clientSecret, refreshToken });
        }

        try {
          const result = await handleToolCall(tool.name, args, client);
          const text = result === undefined ? '{"success": true}' : JSON.stringify(result, null, 2);
          return {
            content: [{ type: 'text' as const, text }],
            isError: false,
          };
        } catch (error) {
          return {
            content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
          };
        }
      }
    );
  }

  // Register prompts
  server.prompt(
    'schedule-and-manage',
    'Guide for creating events, recurring schedules, attendees, and reminders',
    async () => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: [
            'You are a Google Calendar scheduling assistant.',
            '',
            'Creating events:',
            '1. **Timed event** — gcal_create_event with start_date_time + end_date_time (RFC 3339)',
            '2. **All-day event** — Use start_date + end_date (YYYY-MM-DD). Single day: start=15, end=16',
            '3. **Quick add** — gcal_quick_add with natural language ("Meeting tomorrow 3pm")',
            '4. **Attendees** — Pass email addresses array, set send_updates="all" to notify',
            '',
            'Recurring events:',
            '1. **Daily** — recurrence: ["RRULE:FREQ=DAILY"]',
            '2. **Weekly** — recurrence: ["RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR"]',
            '3. **Monthly** — recurrence: ["RRULE:FREQ=MONTHLY;BYMONTHDAY=15"]',
            '4. **Until date** — Add ;UNTIL=20261231T235959Z',
            '5. **Count** — Add ;COUNT=10 for 10 occurrences',
            '6. **Exceptions** — Add EXDATE entries to skip dates',
            '7. **View instances** — gcal_list_instances to see individual occurrences',
            '',
            'Reminders:',
            '- Default reminders: { "useDefault": true }',
            '- Custom: { "useDefault": false, "overrides": [{ "method": "popup", "minutes": 10 }, { "method": "email", "minutes": 60 }] }',
            '',
            'Tips:',
            '- Use "primary" as calendar_id for the main calendar',
            '- Set transparency="transparent" for events that don\'t block time',
            '- Use gcal_patch_event to change only specific fields without affecting others',
            '- Use gcal_move_event to transfer events between calendars',
          ].join('\n'),
        },
      }],
    }),
  );

  server.prompt(
    'search-and-organize',
    'Guide for searching events, managing calendars, sharing, and checking availability',
    async () => ({
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: [
            'You are a Google Calendar organization assistant.',
            '',
            'Searching events:',
            '- **By text** — q parameter searches summary, description, location, attendees',
            '- **By time** — time_min + time_max (RFC 3339) to filter date range',
            '- **Expand recurring** — single_events=true to see individual instances',
            '- **Sort** — order_by="startTime" (requires singleEvents) or "updated"',
            '- **Pagination** — Use max_results + page_token for large result sets',
            '',
            'Managing calendars:',
            '1. **List all** — gcal_list_calendars to see subscribed calendars',
            '2. **Create** — gcal_create_calendar for a new secondary calendar',
            '3. **Customize** — gcal_update_calendar_entry for display color, name override',
            '4. **Subscribe** — gcal_add_calendar to add a shared calendar',
            '5. **Unsubscribe** — gcal_remove_calendar (doesn\'t delete the calendar)',
            '',
            'Sharing calendars (ACL):',
            '- **freeBusyReader** — Can only see free/busy',
            '- **reader** — Can see event details',
            '- **writer** — Can create and edit events',
            '- **owner** — Full control including sharing',
            '- scope_type: "user" (email), "group" (group email), "domain", or "default" (public)',
            '',
            'Checking availability:',
            '- gcal_query_freebusy with time range and calendar IDs',
            '- Returns busy time blocks for each calendar',
            '- Use to find free slots for scheduling meetings',
            '',
            'Colors:',
            '- gcal_get_colors for color palette (IDs 1-24 for calendars, 1-11 for events)',
            '- Apply to events: color_id in gcal_create_event',
            '- Apply to calendars: color_id in gcal_update_calendar_entry',
          ].join('\n'),
        },
      }],
    }),
  );

  // Register resource
  server.resource(
    'server-info',
    'gcal://server-info',
    {
      description: 'Connection status and available tools for this Google Calendar MCP server',
      mimeType: 'application/json',
    },
    async () => ({
      contents: [{
        uri: 'gcal://server-info',
        mimeType: 'application/json',
        text: JSON.stringify({
          name: 'google-calendar-mcp',
          version: '1.0.0',
          connected: !!config,
          has_oauth: !!(config?.clientId),
          tools_available: TOOLS.length,
          tool_categories: {
            events: 10,
            calendar_list: 5,
            calendars: 5,
            acl: 5,
            utility: 3,
          },
        }, null, 2),
      }],
    }),
  );

  // Override tools/list handler to return raw JSON Schema with property descriptions
  (server as any).server.setRequestHandler(ListToolsRequestSchema, () => ({
    tools: TOOLS.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      annotations: tool.annotations,
    })),
  }));

  return server;
}
