# @node2flow/google-calendar-mcp

[![smithery badge](https://smithery.ai/badge/node2flow/google-calendar)](https://smithery.ai/server/node2flow/google-calendar)
[![npm version](https://img.shields.io/npm/v/@node2flow/google-calendar-mcp.svg)](https://www.npmjs.com/package/@node2flow/google-calendar-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP server for **Google Calendar** — create events, manage calendars, check availability, and share calendars through 28 tools via the Model Context Protocol.

## Quick Start

### Claude Desktop / Cursor

Add to your MCP config:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "@node2flow/google-calendar-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-refresh-token"
      }
    }
  }
}
```

### HTTP Mode

```bash
GOOGLE_CLIENT_ID=xxx GOOGLE_CLIENT_SECRET=xxx GOOGLE_REFRESH_TOKEN=xxx npx @node2flow/google-calendar-mcp --http
```

MCP endpoint: `http://localhost:3000/mcp`

### Cloudflare Worker

Available at: `https://google-calendar-mcp-community.node2flow.net/mcp`

```
POST https://google-calendar-mcp-community.node2flow.net/mcp?GOOGLE_CLIENT_ID=xxx&GOOGLE_CLIENT_SECRET=xxx&GOOGLE_REFRESH_TOKEN=xxx
```

---

## Tools (28)

### Events (10)

| Tool | Description |
|------|-------------|
| `gcal_list_events` | List events with time range, search query, pagination |
| `gcal_get_event` | Get event details (attendees, reminders, recurrence) |
| `gcal_create_event` | Create event (timed/all-day, attendees, recurrence, reminders) |
| `gcal_update_event` | Full update of an event (PUT — replaces all fields) |
| `gcal_patch_event` | Partial update (PATCH — only specified fields change) |
| `gcal_delete_event` | Delete an event |
| `gcal_quick_add` | Create event from natural language text |
| `gcal_move_event` | Move event to another calendar |
| `gcal_list_instances` | List instances of a recurring event |
| `gcal_import_event` | Import event with iCalUID |

### CalendarList (5)

| Tool | Description |
|------|-------------|
| `gcal_list_calendars` | List user's subscribed calendars |
| `gcal_get_calendar_entry` | Get calendar display settings |
| `gcal_add_calendar` | Subscribe to an existing calendar |
| `gcal_update_calendar_entry` | Update display settings (color, name, reminders) |
| `gcal_remove_calendar` | Unsubscribe from a calendar |

### Calendars (5)

| Tool | Description |
|------|-------------|
| `gcal_get_calendar` | Get calendar metadata |
| `gcal_create_calendar` | Create a new secondary calendar |
| `gcal_update_calendar` | Update calendar metadata |
| `gcal_delete_calendar` | Delete a secondary calendar |
| `gcal_clear_calendar` | Delete all events from a calendar |

### ACL (5)

| Tool | Description |
|------|-------------|
| `gcal_list_acl` | List access control rules |
| `gcal_get_acl` | Get a specific ACL rule |
| `gcal_create_acl` | Share calendar with user/group/domain |
| `gcal_update_acl` | Update sharing permission |
| `gcal_delete_acl` | Remove sharing permission |

### Utility (3)

| Tool | Description |
|------|-------------|
| `gcal_query_freebusy` | Check availability for scheduling |
| `gcal_get_colors` | Get color palette for events/calendars |
| `gcal_list_settings` | List user calendar settings |

---

## DateTime Format

Google Calendar uses **RFC 3339** format for date-times:

```
Timed events:   2026-03-15T10:00:00-05:00    (with timezone offset)
                2026-03-15T15:00:00Z          (UTC)
All-day events: 2026-03-15                    (date only, YYYY-MM-DD)
```

For all-day events, the end date is **exclusive** — a single-day event on March 15 uses `start_date=2026-03-15` and `end_date=2026-03-16`.

---

## Recurrence Rules

Events can repeat using RRULE format:

```
Daily:    ["RRULE:FREQ=DAILY"]
Weekly:   ["RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR"]
Monthly:  ["RRULE:FREQ=MONTHLY;BYMONTHDAY=15"]
Yearly:   ["RRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=15"]
Until:    ["RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20261231T235959Z"]
Count:    ["RRULE:FREQ=DAILY;COUNT=10"]
```

---

## Configuration

| Parameter | Required | Description |
|-----------|----------|-------------|
| `GOOGLE_CLIENT_ID` | Yes | OAuth 2.0 Client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Yes | OAuth 2.0 Client Secret |
| `GOOGLE_REFRESH_TOKEN` | Yes | Refresh token (obtained via OAuth consent flow) |

### Getting Your Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable **Google Calendar API**
3. Create **OAuth 2.0 Client ID** (Desktop app type)
4. Use the [OAuth Playground](https://developers.google.com/oauthplayground/) or your app to get a refresh token with the Calendar scope

### OAuth Scopes

| Scope | Access |
|-------|--------|
| `calendar` | Full read/write access (recommended) |
| `calendar.readonly` | Read-only access |
| `calendar.events` | Read/write events only |
| `calendar.events.readonly` | Read events only |
| `calendar.settings.readonly` | Read calendar settings |
| `calendar.calendarlist.readonly` | Read calendar list only |

---

## License

MIT License - see [LICENSE](LICENSE)

Copyright (c) 2026 [Node2Flow](https://node2flow.net)

## Links

- [npm Package](https://www.npmjs.com/package/@node2flow/google-calendar-mcp)
- [Google Calendar API](https://developers.google.com/calendar/api/v3/reference)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [Node2Flow](https://node2flow.net)
