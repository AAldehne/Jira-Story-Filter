# JIRA Story Filter

## Überblick
Dieses Projekt ist ein kleines **Chrome-Plugin**, mit dem man im Jira-Board die Stories filtern kann.  
**Alle Unteraufgaben (Sub-Tasks) bleiben erhalten.**

### Optionen
- **Alle** – keine Filter  
- **In Arbeit** – blendet erledigte („DONE“) Tickets aus  
- **Fertig** – blendet offene („NEW“ und „IN PROGRESS“) Tickets aus  

Die letzte Auswahl wird im **LocalStorage** gespeichert und beim nächsten Öffnen übernommen.

---

## Installation (Chrome Extension)

1. Diesen Projektordner lokal **entpacken**.  
2. In Chrome `chrome://extensions` öffnen.  
3. **Entwicklermodus** aktivieren (oben rechts).  
4. **„Entpackte Erweiterung laden“** wählen und den **entpackten Ordner** auswählen.  
5. In der Toolbar auf das Erweiterungs-Icon klicken und einen Modus auswählen.

> Hinweis: Die Extension ist für Jira unter der Domain `https://tickets.optadata.com/` ausgelegt.

---

## Nutzung

- **Alle** zeigt das Board unverändert.  
- **In Arbeit** blendet **DONE**-Karten aus.  
- **Fertig** blendet **NEW** und **IN PROGRESS**-Karten aus.  
- Beim Umschalten wird die Ansicht aktualisiert; Änderungen im Board (Jira SPA) werden automatisch berücksichtigt.

---

## Alternative: Bookmarklets

Falls ihr die Extension nicht installieren wollt, könnt ihr alternativ **Bookmarklets** nutzen.

### Einrichtung
1. Ein neues Lesezeichen erstellen.  
2. Als **Name** z. B. „Jira – In Arbeit filtern“.  
3. Als **URL** den entsprechenden `javascript:(...)`-Code einfügen.  
4. Auf dem Jira-Board das Lesezeichen anklicken.

### In Arbeit filtern (DONE ausblenden)
```javascript
javascript:(()=>{document.querySelectorAll("span.jira-issue-status-lozenge.jira-issue-status-lozenge-done").forEach(el=>{const c=el.closest(".ghx-heading, .ghx-issue, [data-testid='software-board.issue-card']");if(c)c.remove();});})();


### Fertig filtern (NEW & IN PROGRESS ausblenden)

javascript:(()=>{document.querySelectorAll("span.jira-issue-status-lozenge.jira-issue-status-lozenge-new, span.jira-issue-status-lozenge.jira-issue-status-lozenge-inprogress").forEach(el=>{const c=el.closest(".ghx-heading, .ghx-issue, [data-testid='software-board.issue-card']");if(c)c.remove();});})();
