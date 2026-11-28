import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from '../pages/Landing/LandingPage';
import { AuthPage } from '../pages/Auth/AuthPage';
import { CompanionPage } from '../pages/Companion/CompanionPage';
import { MissionCenterPage } from '../pages/MissionCenter/MissionCenterPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { RewardsPage } from '../pages/Rewards/RewardsPage';
import { LeaderboardPage } from '../pages/Leaderboard/LeaderboardPage';
import { MissionModal } from '../components/missions/MissionModal';
import { MISSIONS_DATA } from '../data/missions/missionsData';

describe('Verdantia UI Pages', () => {
  it('renders LandingPage with tagline and WebGL 2D fallback in headless jsdom', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );
    expect(screen.getAllByText(/Play\. Explore\. Protect\. Transform\./i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Start Adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/Verdantia Living Planet/i)).toBeInTheDocument();
  });

  it('validates AuthPage email and password fields', () => {
    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Sign In \(Demo\)/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@verdantia.local' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In \(Demo\)/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/at least 6 characters/i);
  });

  it('answers questions in CompanionPage', () => {
    render(
      <MemoryRouter>
        <CompanionPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/Ask the Local Eco-Guide/i);
    fireEvent.change(input, { target: { value: 'Tell me about solar renewable energy' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText(/Grid-scale batteries/i)).toBeInTheDocument();
  });

  it('filters missions in MissionCenterPage and renders DashboardPage', () => {
    render(
      <MemoryRouter>
        <MissionCenterPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Tree Planting Challenge/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Filter by world/i), {
      target: { value: 'ocean' },
    });
    expect(screen.queryByText(/Tree Planting Challenge/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Surface Plastic Sweep/i)).toBeInTheDocument();

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/World Restoration Progress/i)).toBeInTheDocument();
  });

  it('filters badges in RewardsPage and toggles period in LeaderboardPage', () => {
    render(
      <MemoryRouter>
        <RewardsPage />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /world Badges/i }));
    expect(screen.getByText(/Forest Guardian/i)).toBeInTheDocument();
    expect(screen.queryByText(/First Sprout/i)).not.toBeInTheDocument();

    render(
      <MemoryRouter>
        <LeaderboardPage />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Weekly/i }));
    expect(screen.getByRole('button', { name: /Weekly/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('resets MissionModal state when switching missions', () => {
    const onClose = () => {};
    const { rerender } = render(
      <MissionModal mission={MISSIONS_DATA[0]} onClose={onClose} />,
    );
    expect(screen.getByText(/Progress: 0\/2 answered/i)).toBeInTheDocument();
    const firstOption = screen.getAllByRole('button')[1];
    fireEvent.click(firstOption);
    expect(screen.getByText(/Progress: 1\/2 answered/i)).toBeInTheDocument();

    rerender(<MissionModal mission={MISSIONS_DATA[1]} onClose={onClose} />);
    expect(screen.getByText(/Progress: 0\/2 answered/i)).toBeInTheDocument();
  });
});
